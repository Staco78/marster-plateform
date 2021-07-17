import * as randomSeed from "random-seed";

export default class Random {
	private static generator: randomSeed.RandomSeed = randomSeed.create();

	static init(seed: string) {
		this.generator = randomSeed.create(seed);
	}

	static random() {
		return this.generator.random();
	}
}
