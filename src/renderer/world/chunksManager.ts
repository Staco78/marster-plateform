import Chunk from "./chunk";

import * as PIXI from "pixi.js";
import World from "./world";

export default class ChunksManager {
    private world: World;

    private readonly chunks = new Map<number, Chunk>();
    private readonly unloadedChunks = new Map<number, Chunk>();

    constructor(world: World) {
        this.world = world;
    }

    get(pos: number): Chunk {
        if (this.chunks.has(pos)) return this.returnChunk(this.chunks.get(pos) as Chunk);
        if (this.unloadedChunks.has(pos)) {
            return this.returnChunk(this.loadChunk(pos));
        }

        let chunk = new Chunk(pos, this.world);
        this.chunks.set(pos, chunk);
        chunk.generate();

        return this.returnChunk(this.chunks.get(pos) as Chunk);
    }

    private loadChunk(pos: number): Chunk {
        let chunk = this.unloadedChunks.get(pos) as Chunk;

        this.unloadedChunks.delete(pos);

        this.chunks.set(pos, chunk);

        return chunk;
    }

    // add the chunk to the global container if don't there already
    private returnChunk(chunk: Chunk): Chunk {
        try {
            this.world.container.getChildIndex(chunk.container);
        } catch (e) {
            this.world.container.addChild(chunk.container);
        }

        return chunk;
    }

    unload(pos: number) {
        if (this.unloadedChunks.has(pos)) throw new Error("Chunk already unloaded");

        let chunk = this.chunks.get(pos);

        if (!chunk) throw new Error("Chunk doesn't exist");

        this.chunks.delete(pos);

        this.unloadedChunks.set(pos, chunk);

        this.world.container.removeChild(chunk.container);

        return chunk;
    }

    forEach(callback: (chunk: Chunk, pos: number) => void, thisArg?: any) {
        this.chunks.forEach(callback, thisArg);
    }
}
