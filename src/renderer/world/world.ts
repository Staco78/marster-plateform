import * as PIXI from "pixi.js";
import Block from "../blocks/block";
import { renderDistance } from "../common/constants";
import Player from "../player/player";
import Chunk from "./chunk";

export default class World {
	player: Player = new Player(this);

	private stage: PIXI.Container;
	readonly chunks = new Map<Number, Chunk>();

	constructor(stage: PIXI.Container) {
		this.stage = stage;

		this.player.on("move", () => this.handlePlayerMoved());

		for (let i = 8; i < 20; i++) this.setBlock(new PIXI.Point(0, i));
	}

	private handlePlayerMoved() {
		this.calcRenderDistance();
	}

	calcRenderDistance() {
		for (let i = this.player.actualChunk - renderDistance; i <= this.player.actualChunk + renderDistance; i++) {
			if (!this.chunks.has(i)) {
				let chunk = new Chunk(this.stage, i);
				chunk.generate();
				this.chunks.set(i, chunk);
			}
		}

		this.chunks.forEach((chunk, pos) => {
			if (pos < this.player.actualChunk - renderDistance && pos > this.player.actualChunk + renderDistance) {
				this.chunks.delete(pos);
			}
		});
	}

	setBlock(pos: PIXI.Point) {
		let chunkPos = Math.floor(pos.x / 16);
		let blockPos = new PIXI.Point(pos.x % 16, pos.y);
		if (!this.chunks.has(chunkPos)) {
			let chunk = new Chunk(this.stage, chunkPos);
			chunk.generate();
			this.chunks.set(chunkPos, chunk);
		}
		(this.chunks.get(chunkPos) as Chunk).setBlock(blockPos, new Block(blockPos));
	}
}
