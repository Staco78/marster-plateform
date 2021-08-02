import MutliplayerConnection from "./connection";

export default class WsMessage<T = any> {
    readonly data: T;
    readonly action: string;

    protected connection: MutliplayerConnection;

    constructor(data: wsMessageData<T>, connection: MutliplayerConnection) {
        this.data = data.data;
        this.action = data.action as string;

        this.connection = connection;
    }
}
