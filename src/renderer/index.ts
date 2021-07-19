import * as PIXI from "pixi.js";

import Game from "./game/game";
import loadAll from "./common/ressourceLoader";

import SaveManager from "./common/saveManager";

SaveManager.init();

const app = new PIXI.Application({ width: 256, height: 256 });

document.getElementById("container")?.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";

loadAll(() => {
    let metadataList = SaveManager.getGameList();

	let metadata = metadataList[0] || { name: "world 1", seed: Date.now().toString() };
    const game = new Game(app, metadata.name, metadata.seed);
    game.start();
});
