import * as PIXI from "pixi.js";
import Block from "../blocks/block";
import { renderDistance } from "../common/constants";
import { negativeModulo } from "../common/utils";
import Player from "../player/player";
import ChunksManager from "./chunksManager";

export default class World {
    player: Player = new Player(this);

    readonly container: PIXI.Container;
    readonly chunks;

    constructor(stage: PIXI.Container) {
        this.container = stage;

        this.chunks = new ChunksManager(this);

        this.player.on("move", () => this.handlePlayerMoved());
    }

    private handlePlayerMoved() {
        this.calcRenderDistance();
    }

    calcRenderDistance() {
        for (let i = this.player.actualChunk - renderDistance; i <= this.player.actualChunk + renderDistance; i++) {
            this.chunks.get(i);
        }

        this.chunks.forEach((chunk, pos) => {
            if (pos < this.player.actualChunk - renderDistance || pos > this.player.actualChunk + renderDistance) {
                this.chunks.unload(pos);
                this.container.removeChild(chunk.container);
            }
        });
    }

    setBlock(pos: PIXI.Point, block: typeof Block) {
        let chunkPos = Math.floor(pos.x / 16);

        let blockPos = new PIXI.Point(negativeModulo(pos.x), pos.y);

        this.chunks.get(chunkPos).setBlock(blockPos, block);
    }

    getBlock(pos: PIXI.Point): Block | undefined {
        let chunkPos = Math.floor(pos.x / 16);

        let blockPos = new PIXI.Point(negativeModulo(pos.x), pos.y);

        let chunk = this.chunks.get(chunkPos);
        if (!chunk) return undefined;

        return chunk.blocks.get(blockPos);
    }

    deleteBlock(pos: PIXI.Point) {
        let chunkPos = Math.floor(pos.x / 16);

        let blockPos = new PIXI.Point(negativeModulo(pos.x), pos.y);

        let chunk = this.chunks.get(chunkPos);
        if (!chunk) throw new Error("Block not found");

        if (!chunk.blocks.has(blockPos)) throw new Error("Block not found");

        chunk.blocks.delete(blockPos);
    }
}
