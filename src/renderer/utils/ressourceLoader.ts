import * as PIXI from "pixi.js";

// @ts-ignore
import PlayerImg from "../../assets/player.png";

export default function loadAll(callback: () => any) {
	PIXI.Loader.shared.add({ name: "player", url: PlayerImg }).load(callback);
}
