import * as randomSeed from "random-seed";

export default class Random {
	private generator: randomSeed.RandomSeed;
	private seed: number | undefined;

	constructor(seed?: number) {
		this.seed = seed;
		this.generator = randomSeed.create(this.seed?.toString());
	}

	random() {
		return this.generator.random();
	}

	getSeed(){
		return this.seed;
	}
}
