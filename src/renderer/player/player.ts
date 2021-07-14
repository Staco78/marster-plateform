import * as PIXI from "pixi.js";

export default class Player extends PIXI.Sprite {
	constructor() {
		super(PIXI.utils.TextureCache["../static/player.png"]);
	}
}
