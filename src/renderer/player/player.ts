import * as PIXI from "pixi.js";
import inputManager from "../common/inputManager";
import { blockSize, playerSize } from "../common/constants";
import World from "../world/world";

const speed = 0.1;

export default class Player extends PIXI.Sprite {
	private pos: PIXI.Point = new PIXI.Point(0, 0);
	private world: World;

	constructor(world: World) {
		super(PIXI.utils.TextureCache["player"]);

		this.world = world;

		this.zIndex = 10;

		this.anchor.set(0, 1);

		this.width = playerSize.width;
		this.height = playerSize.height;

		inputManager.on(" ", () => this.handleSpace());
	}

	private handleSpace() {
	}


	tick(delta: number) {
		if (inputManager.isPressed("d")) this.pos.x += speed * delta;
		if (inputManager.isPressed("q")) this.pos.x -= speed * delta;

		this.x = this.pos.x * blockSize.width;
		this.y = this.pos.y * -blockSize.height;
	}
}
