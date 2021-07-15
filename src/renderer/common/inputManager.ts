import { EventEmitter } from "events";

export default class inputManager {
	private static activeKeys: any = {};
	private static eventEmitter: EventEmitter = new EventEmitter();

	static init() {
		document.onkeydown = e => {
			this.activeKeys[e.key] = true;

			this.eventEmitter.emit(e.key);
		};

		document.onkeyup = e => {
			delete this.activeKeys[e.key];
		};
	}

	static isPressed(key: string) {
		return Boolean(this.activeKeys[key]);
	}

	static on(event: string, callback: () => void) {
		this.eventEmitter.on(event, callback);
	}
}
