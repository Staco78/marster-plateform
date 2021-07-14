import * as PIXI from "pixi.js";
import Player from "../player/player";
import inputManager from "../utils/inputManager";

export default class Game {
	private app: PIXI.Application;

	private player: Player;

	constructor(app: PIXI.Application) {
		this.app = app;

		inputManager.init();

		this.player = new Player();
	}

	start() {
		this.app.stage.addChild(this.player);

		// game loop
		this.app.ticker.add(delta => {
			this.player.tick();

			this.app.stage.x = -(this.player.x - window.innerWidth / 2);
		});
	}
}
