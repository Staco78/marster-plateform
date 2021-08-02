import Chunk from "./chunk";

import Game from "../game/game";

export default class ChunksManager {
    private game: Game;
    private toShow: number[] = [];

    private readonly chunks = new Map<number, Chunk>();

    constructor(game: Game) {
        this.game = game;

        game.multiplayerConnection.on("chunk", (data: wsMessageData<Receive.Chunk>) => {
            this.addChunkFromData(data.data.data, data.data.pos);
        });
    }

    get(pos: number): Chunk | undefined {
        if (this.chunks.has(pos)) return this.returnChunk(this.chunks.get(pos) as Chunk);

        this.toShow.push(pos);

        return undefined;
    }

    // add the chunk to the global container if don't there already
    private returnChunk(chunk: Chunk): Chunk {
        try {
            this.game.world.container.getChildIndex(chunk.container);
        } catch (e) {
            this.game.world.container.addChild(chunk.container);
        }

        return chunk;
    }

    private addChunkFromData(data: string, pos: number) {
        let chunk = new Chunk(pos, this.game.world);
        chunk.fromSaveString(data);
        this.chunks.set(pos, chunk);

        console.log("add chunk", pos, data.length);
        

        return this.returnChunk(chunk);

        const toShowPosIndex = this.toShow.findIndex(p => p === pos);

        if (toShowPosIndex !== -1) {
            this.returnChunk(chunk);
            this.toShow.splice(toShowPosIndex);
        }
    }

    unload(pos: number) {
        let chunk = this.chunks.get(pos);

        if (!chunk) throw new Error("Chunk doesn't exist");

        console.log("delete chunk", pos);
        

        this.chunks.delete(pos);

        this.game.world.container.removeChild(chunk.container);

        return chunk;
    }

    forEach(callback: (chunk: Chunk, pos: number) => void, thisArg?: any) {
        this.chunks.forEach(callback, thisArg);
    }
}
