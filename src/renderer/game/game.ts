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

	private world: World = new World();
	private player: Player = this.world.player;

	private playerCenteredContainer = new PIXI.Container();
	private staticContainer = new PIXI.Container();

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
		this.world.draw(this.playerCenteredContainer);

		let FPSText = new PIXI.Text("");
		this.staticContainer.addChild(FPSText);

		// game loop
		this.app.ticker.add(delta => {
			this.player.tick(delta);

			this.playerCenteredContainer.x = -this.player.x;
			this.playerCenteredContainer.y = -this.player.y;
		});

		setInterval(() => {
			// 10 FPS loop

			FPSText.text = this.app.ticker.FPS.toFixed();

		}, 100);
	}
}
