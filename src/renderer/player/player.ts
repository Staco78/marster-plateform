import * as PIXI from "pixi.js";
import inputManager from "../common/inputManager";

const speed = 10;

export default class Player extends PIXI.Sprite {
	constructor() {
		super(PIXI.utils.TextureCache["player"]);

		this.x = (window.innerWidth - this.width) / 2;
		this.y = (window.innerHeight - this.height) / 2;

	}

	tick() {
		if (inputManager.isActive("d")) this.x += speed;
		if (inputManager.isActive("q")) this.x -= speed;
	}
}
