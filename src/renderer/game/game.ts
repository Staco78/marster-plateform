import * as PIXI from "pixi.js";

import Player from "../players/player";
import inputManager from "../common/inputManager";
import World from "../world/world";
import { negativeModulo } from "../common/utils";
import { WebSocket } from "reply-ws";
import MainPlayer from "../players/mainPlayer";

function appResize(app: PIXI.Application, stage: PIXI.Container, playerSize: { width: number; height: number }) {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    stage.pivot.set(-((window.innerWidth - playerSize.width) / 2), -((window.innerHeight + playerSize.height) / 2));
}

export default class Game {
    private app: PIXI.Application;

    readonly playerCenteredContainer = new PIXI.Container();
    readonly staticContainer = new PIXI.Container();

    ws = new WebSocket("ws://localhost:3497");

    world: World;
    private player: MainPlayer;

    name: string;

    constructor(app: PIXI.Application, name: string, seed: string) {
        this.app = app;
        this.app.stage.sortableChildren = true;
        this.playerCenteredContainer.sortableChildren = true;

        this.name = name;

        const playerName = Date();

        this.world = new World(this.playerCenteredContainer, this, seed, new MainPlayer(playerName));

        this.player = this.world.player;

        window.onresize = () => appResize(this.app, this.playerCenteredContainer, { width: this.player.width, height: this.player.height });

        window.onresize(null as any);

        this.ws.on("close", (code, reason) => {
            alert(`Ws close code ${code} ${reason}`);
        });

        this.ws.on("error", err => console.log(err));

        this.ws.send("ping", {}).then((data: Receive.Pong) => {
            console.log(data.name);

            this.ws.send("login", { username: playerName });
        });
    }

    start() {
        this.app.stage.addChild(this.playerCenteredContainer);
        this.app.stage.addChild(this.staticContainer);

        // this.playerCenteredContainer.addChild(this.player);

        let FPSText = new PIXI.Text("", { fontSize: 20 });
        this.staticContainer.addChild(FPSText);

        let playerPosText = new PIXI.Text("", { fontSize: 20 });
        playerPosText.y = 20;
        this.staticContainer.addChild(playerPosText);

        let playerChunkPosText = new PIXI.Text("", { fontSize: 20 });
        playerChunkPosText.y = 40;
        this.staticContainer.addChild(playerChunkPosText);

        let playerSpeedText = new PIXI.Text("", { fontSize: 20 });
        playerSpeedText.y = 60;
        this.staticContainer.addChild(playerSpeedText);

        inputManager.init();

        this.world.calcRenderDistance();

        // game loop
        this.app.ticker.add(delta => {
            this.player.tick();

            this.playerCenteredContainer.x = -this.player.x;
            this.playerCenteredContainer.y = -this.player.y;
        });

        setInterval(() => {
            // 10 FPS loop

            FPSText.text = this.app.ticker.FPS.toFixed();

            playerPosText.text = `X: ${this.player.getPos().x} Y: ${this.player.getPos().y}`;
            playerChunkPosText.text = `Chunk: ${this.player.actualChunk} Relative pos: X: ${negativeModulo(this.player.getPos().x)} Y: ${this.player.getPos().y}`;
            playerSpeedText.text = `Speed: X: ${this.player.speed.x} Y: ${this.player.speed.y}`;
        }, 100);
    }

    getMetaData(): GameMetaData {
        return {
            name: this.name,
            seed: this.world.generator.seed.toString(),
            lastLoadedTimeStamp: new Date(),
        };
    }
}
