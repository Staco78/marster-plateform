import * as PIXI from "pixi.js";
import Block from "../blocks/block";
import { renderDistance } from "../common/constants";
import { negativeModulo } from "../common/utils";
import Player from "../players/player";
import ChunksManager from "./chunksManager";
import Generation from "../generation/generation";
import Game from "../game/game";
import { WsMessage } from "reply-ws";
import MainPlayer from "../players/mainPlayer";
export default class World {
    readonly player: MainPlayer;

    readonly othersPlayers = new Map<string, Player>();

    readonly container: PIXI.Container;
    readonly chunks;

    readonly game: Game;

    readonly generator: Generation;

    constructor(container: PIXI.Container, game: Game, seed: string, player: MainPlayer) {
        this.container = container;

        this.game = game;

        this.chunks = new ChunksManager(game);

        this.generator = new Generation(this, seed);

        this.player = player;
        player.init(this);

        this.game.playerCenteredContainer.addChild(this.player);

        this.player.on("move", () => this.handlePlayerMoved());

        this.game.ws.onAction("playerMoved", (message: WsMessage<Receive.PlayerMoved>) => {
            if (message.data.username !== this.player.username) {
                if (!this.othersPlayers.get(message.data.username)) {
                    const player = new Player(message.data.username);
                    player.init(this);
                    this.game.playerCenteredContainer.addChild(player);
                    this.othersPlayers.set(message.data.username, player);
                }
            }
        });

        this.game.ws.onAction("blockBreak", (data: WsMessage<Receive.BlockBreak>) => {
            this.deleteBlock(new PIXI.Point(data.data.block.x, data.data.block.y));
        });
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

        this.chunks.get(chunkPos)?.setBlock(blockPos, block);
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

        if (!chunk) throw new Error(`Block not found (${pos.x}:${pos.y})`);

        if (!chunk.blocks.has(blockPos)) throw new Error(`Block not found (${pos.x}:${pos.y})`);

        chunk.deleteBlock(blockPos);
    }
}
