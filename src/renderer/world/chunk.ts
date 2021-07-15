import * as PIXI from "pixi.js";
import BLock from "../blocks/block";
import { blockSize } from "../common/constants";

export default class Chunk {
	private blocks = new Map<PIXI.Point, BLock>();
	private container = new PIXI.Container();

	constructor(container: PIXI.Container, pos: number) {
		for (let i = 0; i < 16; i++) {
			this.blocks.set(new PIXI.Point(i, 0), new BLock(i, 0));
		}

        console.log("new chunk " + pos);
        

		this.draw();

		this.container.position.set(pos * 16 * blockSize.width, pos * blockSize.height);

		container.addChild(this.container);
	}

	draw() {
		this.blocks.forEach(block => {
			this.container.addChild(block);
		});
	}
}
