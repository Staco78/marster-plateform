import * as PIXI from "pixi.js";
import fs from "fs";

// @ts-ignore
import PlayerImg from "../../assets/textures/player.png";
// @ts-ignore
import Grass from "../../assets/textures/block/grass.png";
// @ts-ignore
import Dirt from "../../assets/textures/block/dirt.png";
// @ts-ignore
import Stone from "../../assets/textures/block/stone.png";

export default function loadAll(callback: () => any) {
	PIXI.Loader.shared
		.add({ name: "player", url: PlayerImg })
		.add({ name: "grass", url: Grass })
		.add({ name: "dirt", url: Dirt })
		.add({ name: "stone", url: Stone })
		.load(callback);
}
