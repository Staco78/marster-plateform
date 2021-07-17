import * as PIXI from "pixi.js";
import Player from "../player/player";
import inputManager from "../common/inputManager";
import World from "../world/world";

function appResize(app: PIXI.Application, stage: PIXI.Container, playerSize: { width: number; height: number }) {
	app.renderer.resize(window.innerWidth, window.innerHeight);
	stage.pivot.set(-((window.innerWidth - playerSize.width) / 2), -((window.innerHeight + playerSize.height) / 2));
}

export default class Game {
	private app: PIXI.Application;

	private playerCenteredContainer = new PIXI.Container();
	private staticContainer = new PIXI.Container();

	private world: World = new World(this.playerCenteredContainer);
	private player: Player = this.world.player;

	constructor(app: PIXI.Application) {
		this.app = app;
		this.app.stage.sortableChildren = true;
		this.playerCenteredContainer.sortableChildren = true;

		appResize(this.app, this.playerCenteredContainer, { width: this.player.width, height: this.player.height });

		window.onresize = () => appResize(this.app, this.playerCenteredContainer, { width: this.player.width, height: this.player.height });

		inputManager.init();
	}

	start() {
		this.app.renderer.backgroundColor = 0x0000ff;

		this.app.stage.addChild(this.playerCenteredContainer);
		this.app.stage.addChild(this.staticContainer);

		this.playerCenteredContainer.addChild(this.player);

		let FPSText = new PIXI.Text("");
		this.staticContainer.addChild(FPSText);
		

		let playerPosText = new PIXI.Text("");
		playerPosText.y = 30;
		this.staticContainer.addChild(playerPosText);

		let playerSpeedText = new PIXI.Text("");
		playerSpeedText.y = 60;
		this.staticContainer.addChild(playerSpeedText);


		this.world.calcRenderDistance();

		// game loop
		this.app.ticker.add(delta => {
			this.player.tick(delta);

			this.playerCenteredContainer.x = -this.player.x;
			this.playerCenteredContainer.y = -this.player.y;
		});

		setInterval(() => {
			// 10 FPS loop

			FPSText.text = this.app.ticker.FPS.toFixed();

			playerPosText.text = `X: ${this.player.pos.x} Y: ${this.player.pos.y}`;
			playerSpeedText.text = `Speed: X: ${this.player.speed.x} Y: ${this.player.speed.y}`;
		}, 100);
	}
}
