import World from "../world/world";
import Block from "./block";

import * as PIXI from "pixi.js"

export default class Leaves extends Block {
	constructor(world: World, pos: PIXI.Point) {
		super(world, pos, "leaves");
	}
}
