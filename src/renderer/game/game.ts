import * as PIXI from "pixi.js";
import Player from "../player/player";

export default class Game {
	private app: PIXI.Application;

	private player: Player;

	constructor(app: PIXI.Application) {
		this.app = app;

		this.player = new Player();
	}

	start() {
		this.app.stage.addChild(this.player);
	}
}
