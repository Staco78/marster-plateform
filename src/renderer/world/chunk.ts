import * as PIXI from "pixi.js";
import Block from "../blocks/block";
import { blockSize } from "../common/constants";

export default class Chunk {
	readonly blocks = new Map<PIXI.Point, Block>();
	private container = new PIXI.Container();

	pos: number;

	constructor(container: PIXI.Container, pos: number) {
		this.pos = pos;

		this.container.position.set(pos * 16 * blockSize.width, 0);

		container.addChild(this.container);
	}

	draw() {
		this.blocks.forEach(block => {
			this.drawOneBlock(block);
		});
	}

	drawOneBlock(block: Block) {
		this.container.addChild(block);
	}

	setBlock(pos: PIXI.Point, block: Block) {
		this.blocks.set(pos, block);

		this.drawOneBlock(block);
	}

	generate() {
		for (let x = 0; x < 16; x++) for (let y = 0; y < 32; y++) this.setBlock(new PIXI.Point(x, y), new Block(new PIXI.Point(x, y)));
	}

}
