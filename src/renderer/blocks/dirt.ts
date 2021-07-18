import World from "../world/world";
import Block from "./block";

import * as PIXI from "pixi.js"

export default class Dirt extends Block {
	constructor(world: World, pos: PIXI.Point) {
		super(world, pos, "dirt");
	}
}
