export default class inputManager {
	private static activeKeys: any = {};

	static init() {
		document.onkeydown = e => {
			this.activeKeys[e.key] = true;
		};

		document.onkeyup = e => {
			delete this.activeKeys[e.key];
		};
	}

	static isActive(key: string) {
		return Boolean(this.activeKeys[key]);
	}
}
