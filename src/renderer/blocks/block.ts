import * as PIXI from "pixi.js";
import { blockSize } from "../common/constants";

export default class BLock extends PIXI.Sprite {

	constructor(x: number, y: number) {
		super(PIXI.utils.TextureCache["block"]);

		this.anchor.set(0, 1);

		this.x = x * blockSize.width;
		this.y = y * -blockSize.height;

		this.height = blockSize.height;
		this.width = blockSize.width;
	}
}
