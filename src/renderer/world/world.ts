import * as PIXI from "pixi.js";
import BLock from "../blocks/block";
import Player from "../player/player";

export default class World {

	player: Player = new Player(this);

	constructor() {}

	draw(stage: PIXI.Container) {
		for (let x = 0; x < 100; x++) {
			// for (let y = 0; y < 100; y++) {
				stage.addChild(new BLock(new PIXI.Point(x, 0)).sprite);
			// }
		}
	}
}
