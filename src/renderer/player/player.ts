import * as PIXI from "pixi.js";
import inputManager from "../common/inputManager";
import { blockSize, collisionDetectionDistance, gravity, jumpStrenght, maxFallSpeed, playerSize, playerSpeed } from "../common/constants";
import World from "../world/world";

export default class Player extends PIXI.Sprite {
	pos: PIXI.Point = new PIXI.Point(0, 60);

	private world: World;

	private isNoClip = false;

	readonly speed = new PIXI.Point(0, 0);

	actualChunk = Math.floor(this.pos.x / 16);

	constructor(world: World) {
		super(PIXI.utils.TextureCache["player"]);

		this.world = world;

		this.zIndex = 10;

		this.anchor.set(0, 1);

		this.width = playerSize.width;
		this.height = playerSize.height;

		inputManager.on(" ", () => this.handleSpace());

		inputManager.on("n", () => (this.isNoClip = !this.isNoClip));
	}

	private handleSpace() {
		if (this.speed.y === 0) this.jump();
	}

	private jump() {
		this.speed.y = jumpStrenght;

		this.emit("jump");
	}

	tick(delta: number) {
		if (inputManager.isPressed("d")) this.speed.x += playerSpeed;

		if (inputManager.isPressed("q")) this.speed.x -= playerSpeed;

		if (this.isNoClip) {
			if (inputManager.isPressed("z")) {
				this.pos.y += playerSpeed * delta;
			}
			if (inputManager.isPressed("s")) {
				this.pos.y -= playerSpeed * delta;
			}
		}

		// gravity
		if (!this.isNoClip) this.speed.y += Math.max(-gravity * delta, -maxFallSpeed);

		if (!this.speed.equals({ x: 0, y: 0 })) {
			this.calcCollision(delta);
			this.move(delta);
			this.emit("move");
		}

		if (this.isNoClip) this.speed.set(0);

		this.actualChunk = Math.floor(this.pos.x / 16);

		this.x = this.pos.x * blockSize.width;
		this.y = this.pos.y * -blockSize.height;
	}

	private calcCollision(delta: number) {
		if (this.isNoClip) return;

		let testPos = this.pos.clone();
		testPos.x += this.speed.x * delta;
		testPos.y += this.speed.y * delta;

		for (let x = Math.round(this.pos.x) - collisionDetectionDistance; x <= Math.round(this.pos.x) + collisionDetectionDistance; x++) {
			for (let y = Math.round(this.pos.y) - collisionDetectionDistance; y <= Math.round(this.pos.y) + collisionDetectionDistance; y++) {
				let block = this.world.getBlock(new PIXI.Point(x, y));
				// console.log(x + " " + y);

				
				if (block) {
					// if (x < 0) alert(block)
					// block.filters = [new PIXI.filters.BlurFilter(100)];

					let blockRect = new PIXI.Rectangle(x, y, 1, 1);

					// colision X
					if (this.testCollisionAABB(new PIXI.Rectangle(testPos.x, this.pos.y, 1, 2), blockRect)) {
						let rightToLeft = Math.abs(this.pos.x + this.width / blockSize.width - blockRect.x) / delta;
						let leftToRight = (blockRect.x + blockRect.width - this.pos.x) / delta;

						this.speed.x = Math.min(rightToLeft, leftToRight);
					}

					// colision Y
					if (this.testCollisionAABB(new PIXI.Rectangle(this.pos.x, testPos.y, 1, 2), blockRect)) {
						let topToBottom = Math.abs(this.pos.y + this.height / blockSize.height - blockRect.y) / delta;
						let bottomToTop = (blockRect.y + blockRect.height - this.pos.y) / delta;

						this.speed.y = Math.min(topToBottom, bottomToTop);
					}
				}
			}
		}
	}

	private move(delta: number) {
		// let chunk = this.world.chunks.get(this.actualChunk) as Chunk;

		this.pos.x += this.speed.x * delta;
		this.pos.y += this.speed.y * delta;

		this.speed.x = 0;
		// this.speed.set(0, 0);
	}

	private testCollisionAABB(rect1: PIXI.Rectangle, rect2: PIXI.Rectangle) {
		return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
	}
}
