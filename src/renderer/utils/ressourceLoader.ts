import * as PIXI from "pixi.js";

export default function loadAll(callback: () => any) {
	PIXI.Loader.shared.add("../static/player.png").load(callback);
}
