import * as PIXI from "pixi.js";
import Block from "../blocks/block";
import Stone from "../blocks/stone";
import { renderDistance } from "../common/constants";
import { negativeModulo } from "../common/utils";
import Player from "../player/player";
import Chunk from "./chunk";

export default class World {
	player: Player = new Player(this);

	private stage: PIXI.Container;
	readonly chunks = new Map<Number, Chunk>();

	constructor(stage: PIXI.Container) {
		this.stage = stage;

		this.player.on("move", () => this.handlePlayerMoved());

	}

	private handlePlayerMoved() {
		this.calcRenderDistance();
	}

	calcRenderDistance() {
		for (let i = this.player.actualChunk - renderDistance; i <= this.player.actualChunk + renderDistance; i++) {
			if (!this.chunks.has(i)) {
				let chunk = new Chunk(this.stage, i);
				this.chunks.set(i, chunk);
				chunk.generate();
			}
		}

		this.chunks.forEach((chunk, pos) => {
			if (pos < this.player.actualChunk - renderDistance || pos > this.player.actualChunk + renderDistance) {
				this.chunks.delete(pos);
				this.stage.removeChild(chunk.container);
			}
		});
	}

	setBlock(pos: PIXI.Point, block: Block) {
		let chunkPos = Math.floor(pos.x / 16);

		let blockPos = new PIXI.Point(negativeModulo(pos.x), pos.y);

		if (!this.chunks.has(chunkPos)) {
			let chunk = new Chunk(this.stage, chunkPos);
			this.chunks.set(chunkPos, chunk);
			chunk.generate();
		}

		console.log(blockPos, chunkPos);

		(this.chunks.get(chunkPos) as Chunk).setBlock(blockPos, block);

	}

	getBlock(pos: PIXI.Point): Block | undefined {
		let chunkPos = Math.floor(pos.x / 16);

		let blockPos = new PIXI.Point(negativeModulo(pos.x), pos.y);

		let chunk = this.chunks.get(chunkPos);
		if (!chunk) return undefined;

		return chunk.blocks.get(blockPos);
	}
}
