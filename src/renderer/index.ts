import * as PIXI from "pixi.js";

import Game from "./game/game";
import loadAll from "./common/ressourceLoader";

const app = new PIXI.Application({ width: 256, height: 256 });

document.getElementById("container")?.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";


loadAll(() => {
	const game = new Game(app);
	game.start();
});
