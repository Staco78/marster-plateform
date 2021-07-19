import Block from "./block";

import * as PIXI from "pixi.js"
import Chunk from "../world/chunk";

export default class Leaves extends Block {
	constructor(chunk: Chunk, pos: PIXI.Point) {
		super(chunk, pos, "leaves");
	}
}
