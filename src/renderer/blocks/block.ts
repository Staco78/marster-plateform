import * as PIXI from "pixi.js";
import { blockSize } from "../common/constants";

export default class BLock {
	sprite: PIXI.Sprite = new PIXI.Sprite(PIXI.utils.TextureCache["block"]);
	pos: PIXI.Point;

	constructor(pos: PIXI.Point) {
		this.pos = pos;

		this.sprite.anchor.set(0, 1);

        this.sprite.x = pos.x * blockSize.width;
        this.sprite.y = pos.y * -blockSize.height;

        this.sprite.height = blockSize.height;
        this.sprite.width = blockSize.width;
	}

}
