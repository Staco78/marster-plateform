import * as PIXI from "pixi.js";
import { blockSize } from "../common/constants";
import World from "../world/world";

export default class Block extends PIXI.Sprite {
    pos: PIXI.Point = new PIXI.Point();

    private world: World;

    constructor(world: World, pos: PIXI.Point, name: string) {
        super(PIXI.utils.TextureCache[name]);

        this.pos;

        this.world = world;

        this.anchor.set(0, 1);

        this.pos = pos;

        this.x = pos.x * blockSize.width;
        this.y = pos.y * -blockSize.height;

        this.height = blockSize.height;
        this.width = blockSize.width;

        this.interactive = true;

        this.on("pointerdown", () => this.delete());
    }

    delete() {
        this.world.deleteBlock(this.pos);
    }
}
