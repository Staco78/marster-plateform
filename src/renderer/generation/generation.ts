import * as PIXI from "pixi.js";
import Block from "../blocks/block";
import Dirt from "../blocks/dirt";
import Grass from "../blocks/grass";
import Stone from "../blocks/stone";
import Random from "../common/random";
import Chunk from "../world/chunk";

var Simple1DNoise = function () {
	var MAX_VERTICES = 256;
	var MAX_VERTICES_MASK = MAX_VERTICES - 1;
	var amplitude = 1;
	var scale = 1;

	var r: number[] = [];

	for (var i = 0; i < MAX_VERTICES; ++i) {
		r.push(Random.random());
	}

	var getVal = function (x: number) {
		var scaledX = x * scale;
		var xFloor = Math.floor(scaledX);
		var t = scaledX - xFloor;
		var tRemapSmoothstep = t * t * (3 - 2 * t);

		var xMin = xFloor % MAX_VERTICES_MASK;
		var xMax = (xMin + 1) % MAX_VERTICES_MASK;

		var y = lerp(r[xMin], r[xMax], tRemapSmoothstep);

		return y * amplitude;
	};

	/**
	 * Linear interpolation function.
	 * @param a The lower integer value
	 * @param b The upper integer value
	 * @param t The value between the two
	 * @returns {number}
	 */
	var lerp = function (a: number, b: number, t: number): number {
		return a * (1 - t) + b * t;
	};

	// return the API
	return {
		getVal: getVal,
		setAmplitude: function (newAmplitude: number) {
			amplitude = newAmplitude;
		},
		setScale: function (newScale: number) {
			scale = newScale;
		},
	};
};

export default class Generation {
	static seed: number;

	private static noise: {
		getVal: (x: number) => number;
		setAmplitude: (newAmplitude: number) => void;
		setScale: (newScale: number) => void;
	};

	static init() {
		this.noise = Simple1DNoise();
	}

	static generateChunk(chunk: Chunk) {
		for (let x = 0; x < 16; x++) {
			let calcBlockPos = (chunk.pos * 16 + x) / 50;

			let positiveBlockPos = 1000000 - calcBlockPos;

			let noise = this.noise.getVal(positiveBlockPos);

			let y = Math.round((noise + 1) * 40);

			chunk.setBlock(new PIXI.Point(x, y), new Grass());
			y--;

			chunk.setBlock(new PIXI.Point(x, y), new Dirt());
			y--;

			chunk.setBlock(new PIXI.Point(x, y), new Dirt());
			y--;

			chunk.setBlock(new PIXI.Point(x, y), new Dirt());
			y--;
			

			for (; y >= 0; y--) {
				chunk.setBlock(new PIXI.Point(x, y), new Stone());
			}
		}
	}
}
