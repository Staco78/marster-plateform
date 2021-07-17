import * as PIXI from "pixi.js";
import Block from "../blocks/block";
import { blockSize } from "../common/constants";
import Generation from "../generation/generation";

export default class Chunk {
	readonly blocks = new BlockMap();
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
		// for (let x = 0; x < 16; x++) for (let y = 0; y < 32; y++) this.setBlock(new PIXI.Point(x, y), new Block(new PIXI.Point(x, y)));
		Generation.generateChunk(this);
	}
}

class BlockMap {
	private data = new Map<String, Block>();

	private hash(key: PIXI.Point) {
		return `${key.x} ${key.y}`;
	}

	set(key: PIXI.Point, block: Block) {
		this.data.set(this.hash(key), block);
	}

	has(key: PIXI.Point): boolean {
		return this.data.has(this.hash(key));
	}

	get(key: PIXI.Point) {
		return this.data.get(this.hash(key));
	}

	forEach(callback: (block: Block) => void, thisArg?: any){
		this.data.forEach(callback, thisArg);
	}
}
