import * as PIXI from "pixi.js";
import { blockSize } from "../common/constants";
import Chunk from "../world/chunk";

export default class Block extends PIXI.Sprite {
    pos: PIXI.Point;

    private chunk: Chunk;

    name: string;

    constructor(chunk: Chunk, pos: PIXI.Point, name: BlockName) {
        super(PIXI.utils.TextureCache[name]);

        this.chunk = chunk;

        this.name = name;

        this.anchor.set(0, 1);

        this.pos = pos;

        this.x = pos.x * blockSize.width;
        this.y = pos.y * -blockSize.height;

        this.height = blockSize.height;
        this.width = blockSize.width;

        this.interactive = true;

        this.on("pointerdown", () => this.delete());
    }

    delete() {
        this.chunk.deleteBlock(this.pos);
    }

   
}
