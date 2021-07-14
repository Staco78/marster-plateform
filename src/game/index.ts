import * as PIXI from "pixi.js";
import { join as pathJoin } from "path";

const app = new PIXI.Application({ width: 256, height: 256 });

document.getElementById("container")?.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

let player = new PIXI.Sprite(PIXI.Texture.from(pathJoin(__dirname, "../static/player.png")));

app.stage.addChild(player);
