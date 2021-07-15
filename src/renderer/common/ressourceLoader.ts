import * as PIXI from "pixi.js";

// @ts-ignore
import PlayerImg from "../../assets/player.png";
//@ts-ignore
import BlockImg from "../../assets/block.png";

export default function loadAll(callback: () => any) {
	PIXI.Loader.shared.add({ name: "player", url: PlayerImg }).add({ name: "block", url: BlockImg }).load(callback);
}
