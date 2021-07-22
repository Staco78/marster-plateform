import * as PIXI from "pixi.js";
import inputManager from "../common/inputManager";
import { blockSize, collisionDetectionDistance, jumpStrenght, playerSize } from "../common/constants";
import World from "../world/world";

export default class Player extends PIXI.Sprite {
    pos: PIXI.Point = new PIXI.Point(0, 60);

    private world: World;

    private isNoClip = false;

    readonly speed = new PIXI.Point(0, 0);

    actualChunk = Math.floor(this.pos.x / 16);

    private move = Direction.stop;

    constructor(world: World) {
        super(PIXI.utils.TextureCache["player"]);

        this.world = world;

        this.zIndex = 10;

        this.anchor.set(0, 1);

        this.width = playerSize.width;
        this.height = playerSize.height;

        inputManager.on(" ", () => this.handleSpace());

        inputManager.on("n", () => (this.isNoClip = !this.isNoClip));

        this.world.game.multiplayerConnection.on("move", (data: Receive.Move) => {
            this.pos.copyFrom(data.pos);
        });
    }

    private handleSpace() {
        if (this.speed.y === 0) this.jump();
    }

    private jump() {
        this.world.game.multiplayerConnection.send("jump", {});

        this.emit("jump");
    }

    private sendMove(direction: Direction) {
        this.world.game.multiplayerConnection.send("move", { direction });
    }

    tick() {
        // this.world.game.requestInterpreter.connection.send("move", { direction: Direction.left });

        if (inputManager.isPressed("d")) {
            if (this.move !== Direction.right) {
                this.move = Direction.right;
                this.sendMove(Direction.right);
            }
            this.emit("move");
        } else if (inputManager.isPressed("q")) {
            if (this.move !== Direction.left) {
                this.move = Direction.left;
                this.sendMove(Direction.left);
            }

            this.emit("move");
        } else {
            if (this.move !== Direction.stop) {
                this.move = Direction.stop;
                this.sendMove(Direction.stop);
            }
        }

        this.actualChunk = Math.floor(this.pos.x / 16);

        this.x = this.pos.x * blockSize.width;
        this.y = this.pos.y * -blockSize.height;
    }
}
