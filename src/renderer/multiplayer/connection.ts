import { EventEmitter } from "events";

export default class MutliplayerConnection extends EventEmitter {
    private ws = new WebSocket("ws://localhost:3497");
    private _connection: MutliplayerConnectionConnection = new EventEmitter();

    constructor() {
        super();

        this.ws.onmessage = e => this._connection.emit("message", e);
        this.ws.onclose = e => this._connection.emit("close", e);
        this.ws.onerror = e => this._connection.emit("error", e);
        this.ws.onopen = e => this._connection.emit("open", e);

        this.connection.on("close", e => console.log(e.code, e.reason));

        this.connection.on("message", e => {
            const json = JSON.parse(e.data);

            if (json.action) this.emit(json.action, json.data || {});
            else throw new Error("Wrong data received");
        });

        this.connection.on("open", e => {
            this.ws.send(JSON.stringify({ action: "login", data: { username: "staco" } }));
        });
    }

    on(event: actionReceive, listener: (data: any) => void): this {
        return super.on(event, listener);
    }

    send(action: actionSend, data: any) {
        if (this.ws.readyState === WebSocket.OPEN)
            this.ws.send(
                JSON.stringify({
                    action,
                    data,
                })
            );
        else
            this.connection.on("open", () => {
                this.ws.send(
                    JSON.stringify({
                        action,
                        data,
                    })
                );
            });
    }

    public get connection() {
        return this._connection;
    }
}
