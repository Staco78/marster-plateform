import * as PIXI from "pixi.js";
import { blockSize } from "../common/constants";

export default class Block extends PIXI.Sprite {
	pos: PIXI.Point = new PIXI.Point();

	constructor(name: string) {
		super(PIXI.utils.TextureCache[name]);

		this.pos;

		this.anchor.set(0, 1);

		this.height = blockSize.height;
		this.width = blockSize.width;
	}

	setPos(pos: PIXI.Point) {
		this.pos = pos;

		this.x = pos.x * blockSize.width;
		this.y = pos.y * -blockSize.height;
	}
}
