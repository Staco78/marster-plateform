import * as PIXI from "pixi.js";

const app = new PIXI.Application({ width: 256, height: 256 });

document.getElementById("container")?.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);
