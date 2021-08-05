import Player from "./player";
import World from "../world/world";
import inputManager from "../common/inputManager";
import { WsMessage } from "reply-ws";
import { blockSize } from "../common/constants";

export default class MainPlayer extends Player {
    constructor(username: string) {
        super(username);
    }

    init(world: World) {
        inputManager.on(" ", () => this.jump());

        super.init(world);
    }

    private jump() {
        this.world.game.ws.send("jump", {});

        this.emit("jump");
    }

    private sendMove(direction: Direction) {
        this.world.game.ws.send("move", { direction });
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
