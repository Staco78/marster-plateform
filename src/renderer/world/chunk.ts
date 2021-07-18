import * as PIXI from "pixi.js";
import Block from "../blocks/block";
import { blockSize } from "../common/constants";
import Generation from "../generation/generation";
import World from "./world";

export default class Chunk {
    readonly blocks = new BlockMap();
    readonly container = new PIXI.Container();

    private world: World;

    pos: number;

    constructor(pos: number, world: World) {
        this.pos = pos;

        this.world = world;

        this.container.position.set(pos * 16 * blockSize.width, 0);
    }

    draw() {
        this.blocks.forEach(block => {
            this.drawOneBlock(block);
        });
    }

    drawOneBlock(block: Block) {
        this.container.addChild(block);
    }

    setBlock(pos: PIXI.Point, block: typeof Block) {
        if (pos.x < 0 || pos.x > 15 || pos.y < 0) throw new Error("Block out of chunk range");
        if (Math.trunc(pos.x) !== pos.x || Math.trunc(pos.y) !== pos.y)
            throw new Error("Block position must be an integer");

        if (block.name === "Block") throw new Error("Cannot directly instantiate Block");

        // @ts-ignore
        let _block = new block(this.world, pos);

        if (this.blocks.has(pos)) {
            this.blocks.delete(pos);
        }

        this.blocks.set(pos, _block);

        this.drawOneBlock(_block);
    }

    generate() {
        Generation.generateChunk(this);
    }
}

class BlockMap {
    private data = new Map<String, Block>();

    private hash(key: PIXI.Point) {
        return `${key.x} ${key.y}`;
    }

    set(key: PIXI.Point, block: Block) {
        if (this.data.has(this.hash(key))) throw new Error("Block already exist");

        this.data.set(this.hash(key), block);
    }

    has(key: PIXI.Point): boolean {
        return this.data.has(this.hash(key));
    }

    get(key: PIXI.Point) {
        return this.data.get(this.hash(key));
    }

    forEach(callback: (block: Block) => void, thisArg?: any) {
        this.data.forEach(callback, thisArg);
    }

    delete(pos: PIXI.Point) {
        let block = this.get(pos);
        if (!block) throw new Error("Block not found");

        block.destroy();

        this.data.delete(this.hash(pos));
    }
}
