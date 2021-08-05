type EventEmitter = import("events").EventEmitter;

interface MutliplayerConnectionType {
    connection: MutliplayerConnectionConnection;
}

interface MutliplayerConnectionConnection extends EventEmitter {
    on(event: "message", listener: (e: MessageEvent) => void): this;
    on(event: "close", listener: (e: CloseEvent) => void): this;
    on(event: "error", listener: (e: Event) => void): this;
    on(event: "open", listener: (e: Event) => void): this;
}

type actionReceive = "move" | "chunk" | "blockBreak";
type actionSend = "ping" | "login" | "move" | "jump" | "blockBreak";

declare const enum Direction {
    stop,
    left,
    right,
}

interface ChunkData {
    pos: number;
    data: string;
}

interface wsMessageData<T = any> {
    type: 0 | 1 | 2;
    action?: string;
    id?: string;
    data: T;
}

declare namespace Send {
    interface Login {
        username: string;
    }

    interface PlayerStartMove {
        direction: Direction;
    }

    interface BlockBreak {
        block: {
            x: number;
            y: number;
        };
    }
}

declare namespace Receive {
    interface Pong {
        name: string;
    }

    interface Login {
        success: boolean;
        chunks: ChunkData[];
    }

    interface PlayerMoved {
        username: string;
        pos: { x: number; y: number };
    }

    interface Chunk {
        pos: number;
        data: string;
    }

    interface BlockBreak {
        block: {
            x: number;
            y: number;
        };
    }
}
