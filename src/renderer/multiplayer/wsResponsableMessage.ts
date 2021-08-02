import MutliplayerConnection from "./connection";
import WsMessage from "./wsMessage";

export default class wsResponsableMessage<T, V = any> extends WsMessage<T> {
    readonly id: string;

    constructor(data: wsMessageData<T>, connection: MutliplayerConnection) {
        super(data, connection);

        this.id = data.id as string;
    }

    response(data: V) {
        this.connection.sendRaw({ type: 2, data: data, id: this.id });
    }
}
