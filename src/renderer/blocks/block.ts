import * as PIXI from "pixi.js";
import { blockSize } from "../common/constants";

export default class Block extends PIXI.Sprite {

	pos: PIXI.Point;

	constructor(pos: PIXI.Point) {
		super(PIXI.utils.TextureCache["block"]);

		this.pos = pos;

		this.anchor.set(0, 1);

		this.x = pos.x * blockSize.width;
		this.y = pos.y * -blockSize.height;

		this.height = blockSize.height;
		this.width = blockSize.width;
	}

}
