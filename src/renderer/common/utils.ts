import Block from "../blocks/block";
import Dirt from "../blocks/dirt";
import Grass from "../blocks/grass";
import Leaves from "../blocks/leaves";
import Stone from "../blocks/stone";
import Wood from "../blocks/wood";

import * as uuid from "uuid";

export function negativeModulo(x: number) {
    let result;
    if (x % 16 == 0) result = 0;
    else if (x >= 0) result = x % 16;
    else result = 16 + (x % 16);

    return result;
}

export function getBlockClassFromName(name: BlockName | string): typeof Block {
    switch (name) {
        case "dirt":
            return Dirt;

        case "grass":
            return Grass;

        case "leaves":
            return Leaves;

        case "stone":
            return Stone;

        case "wood":
            return Wood;

        default:
            throw new Error("No block exist with this name");
    }
}


export function generateUuid(){
	return uuid.v4();
}