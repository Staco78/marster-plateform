import * as PIXI from "pixi.js";

// @ts-ignore
import Player from "../../assets/textures/player.png";
// @ts-ignore
import Grass from "../../assets/textures/block/grass.png";
// @ts-ignore
import Dirt from "../../assets/textures/block/dirt.png";
// @ts-ignore
import Stone from "../../assets/textures/block/stone.png";
// @ts-ignore
import Wood from "../../assets/textures/block/wood.png";
// @ts-ignore
import Leaves from "../../assets/textures/block/leaves.png";

export default function loadAll(callback: () => any) {
	PIXI.Loader.shared
		.add({ name: "player", url: Player })
		.add({ name: "grass", url: Grass })
		.add({ name: "dirt", url: Dirt })
		.add({ name: "stone", url: Stone })
		.add({ name: "wood", url: Wood })
		.add({ name: "leaves", url: Leaves })
		.load(callback);
}
