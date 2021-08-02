import { EventEmitter } from "events";
import { generateUuid } from "../common/utils";
import WsMessage from "./wsMessage";
import wsResponsableMessage from "./wsResponsableMessage";

export default class MutliplayerConnection extends EventEmitter {
    private ws = new WebSocket("ws://localhost:3497");
    private _connection: MutliplayerConnectionConnection = new EventEmitter();

    private responseEventEmitter = new EventEmitter();

    constructor() {
        super();

        this.ws.onmessage = e => this._connection.emit("message", e);
        this.ws.onclose = e => this._connection.emit("close", e);
        this.ws.onerror = e => this._connection.emit("error", e);
        this.ws.onopen = e => this._connection.emit("open", e);

        this.connection.on("close", e => console.log(e.code, e.reason));

        this.connection.on("message", e => {
            if ((<string>e.data).startsWith("Error")) return alert(e.data);

            this.parseMessage(e.data);
        });

        this.connection.on("open", e => {
            this.send("login", { username: Date.now().toString() });
        });
    }

    private parseMessage(data: string) {
        let json: wsMessageData;

        try {
            json = JSON.parse(data.toString());
        } catch (error) {
            throw new Error("Invalid json");
        }

        if (json.type === undefined) throw new Error("Invalid json: missing type");
        if (json.type !== 0 && json.type !== 1 && json.type !== 2) throw new Error("Invalid json: unkown type");

        if (!json.data) throw new Error("Invalid json: missing data");
        if (typeof json.data !== "object") throw new Error("Invalid json");

        if (json.type === 0) {
            if (!json.action) throw new Error("Invalid json: missing action");
            if (typeof json.action !== "string") throw new Error("Invalid json");

            console.log(json.action);

            this.emit(json.action, new WsMessage(json, this));
        } else if (json.type === 1) {
            if (!json.action) throw new Error("Invalid json: missing action");
            if (typeof json.action !== "string") throw new Error("Invalid json");

            console.log(json.action);

            if (!json.id) throw new Error("Invalid json: missing id");

            this.emit(json.action, new wsResponsableMessage(json, this));
        } else this.parseResponse(json);
    }

    private parseResponse(json: wsMessageData) {
        if (!json.id || typeof json.id !== "string") throw new Error("Invalid json: missing id");

        this.responseEventEmitter.emit(json.id, json.data);
    }

    on(event: actionReceive, listener: (data: any) => void): this {
        return super.on(event, listener);
    }

    send(action: actionSend, data: any) {
        this.sendRaw({ action, data, type: 0 });
    }

    sendEmit(action: actionSend, data: any) {
        return new Promise<any>((resolve, reject) => {
            const id = generateUuid();
            this.sendRaw({ action, data, type: 1, id });

            this.responseEventEmitter.on(id, data => {
                resolve(data);
            });
        });
    }

    sendRaw(data: wsMessageData) {
        if (this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(data));
        else
            this.connection.on("open", () => {
                this.ws.send(JSON.stringify(data));
            });
    }

    public get connection() {
        return this._connection;
    }
}
