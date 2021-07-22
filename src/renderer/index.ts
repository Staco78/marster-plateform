import * as PIXI from "pixi.js";

import loadAll from "./common/ressourceLoader";

import Game from "./game/game";

const app = new PIXI.Application({ width: 800, height: 800 });

document.getElementById("container")?.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";

app.renderer.backgroundColor = 0x4c99ff;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

window.onresize = () => app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.resize(window.innerWidth, window.innerHeight);

loadAll(() => {
    // Home.onplay = (name, seed) => {
    //     Home.hide();
    //     new Game(app, name, seed || Date.now().toString()).start();
    // };
    // Home.show();

    new Game(app, "test", "seed 1").start();


    // home.onstart = (name, seed) => {
    //     home.container.destroy();
    //     app.stage.removeChild(home.container);

    //     const game = new Game(app, name, seed);
    //     game.start();
    // };
});
