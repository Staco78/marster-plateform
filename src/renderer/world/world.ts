import * as PIXI from "pixi.js";
import { renderDistance } from "../common/constants";
import Player from "../player/player";
import Chunk from "./chunk";

export default class World {
	player: Player = new Player(this);

	private chunks = new Map<Number, Chunk>();
	private stage: PIXI.Container;

	constructor(stage: PIXI.Container) {
		this.stage = stage;

		this.player.on("moved", () => this.handlePlayerMoved());
	}

	draw() {
		// this.chunks.forEach(chunk => chunk.draw(this.stage));
	}

	private handlePlayerMoved() {
		this.calcRenderDistance();
	}

	calcRenderDistance() {
		for (let i = this.player.actualChunk - renderDistance; i <= this.player.actualChunk + renderDistance; i++) {
			if (!this.chunks.get(i)) this.chunks.set(i, new Chunk(this.stage, i));
		}

		this.draw();
	}
}
