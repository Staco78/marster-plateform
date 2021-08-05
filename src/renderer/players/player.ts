import * as PIXI from "pixi.js";
import { WsMessage } from "reply-ws";
import { blockSize, playerSize } from "../common/constants";
import World from "../world/world";

export default class Player extends PIXI.Sprite {
    protected pos: PIXI.Point = new PIXI.Point(0, 60);

    protected world!: World;

    protected isNoClip = false;

    readonly speed = new PIXI.Point(0, 0);

    readonly username: string;

    actualChunk = Math.floor(this.pos.x / 16);

    protected move = Direction.stop;

    constructor(username: string) {
        super(PIXI.utils.TextureCache["player"]);

        this.username = username;

        this.zIndex = 10;

        this.anchor.set(0, 1);

        this.width = playerSize.width;
        this.height = playerSize.height;
    }

    setPos(x: number, y: number) {
        this.pos.set(x, y);

        this.x = this.pos.x * blockSize.width;
        this.y = this.pos.y * -blockSize.height;
    }

    getPos() {
        return { x: this.pos.x, y: this.pos.y };
    }

    init(world: World) {
        console.log(this.username);

        this.world = world;

        this.world.game.ws.onAction("playerMoved", (message: WsMessage<Receive.PlayerMoved>) => {
            if (message.data.username === this.username) this.setPos(message.data.pos.x, message.data.pos.y);
        });
    }
}
