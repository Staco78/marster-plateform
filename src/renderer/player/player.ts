import * as PIXI from "pixi.js";
import inputManager from "../common/inputManager";
import { blockSize, playerSize, playerSpeed } from "../common/constants";
import World from "../world/world";

export default class Player extends PIXI.Sprite {
	private pos: PIXI.Point = new PIXI.Point(0, 0);

	private world: World;

	actualChunk = 0;

	constructor(world: World) {
		super(PIXI.utils.TextureCache["player"]);

		this.world = world;

		this.zIndex = 10;

		this.anchor.set(0, 1);

		this.width = playerSize.width;
		this.height = playerSize.height;

		inputManager.on(" ", () => this.handleSpace());
	}

	private handleSpace() {}

	private jump() {
		this.emit("jump");
	}

	tick(delta: number) {
		let moveR = false;
		let moveL = false;
		if (inputManager.isPressed("d")) {
			this.pos.x += playerSpeed * delta;
			moveR = true;
		}
		if (inputManager.isPressed("q")) {
			this.pos.x -= playerSpeed * delta;
			moveL = true;
		}

		this.actualChunk = Math.floor(this.pos.x / 16);

		this.x = this.pos.x * blockSize.width;
		this.y = this.pos.y * -blockSize.height;

		if (moveR) this.emit("movedRight");
		if (moveL) this.emit("movedLeft");
		if ((moveR || moveL) && moveR !== moveL) this.emit("moved");
	}
}
