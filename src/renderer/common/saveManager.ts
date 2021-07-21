import fs from "fs";
import os from "os";
import sanitize from "sanitize-filename";
import Game from "../game/game";
import Chunk from "../world/chunk";
import World from "../world/world";

export default class SaveManager {
    private static saveFolderPath: string;

    static init() {
        this.saveFolderPath = getSaveFolderPath();
    }

    static saveGame(game: Game) {
        let gameFolder = this.saveFolderPath + "\\" + sanitize(game.name, { replacement: "_" });

        if (fs.existsSync(gameFolder)) saveExistGame(game, gameFolder);
        else saveNewGame(game, gameFolder);
    }

    static getGameList(): GameMetaData[] {
        let gameFolderList = fs.readdirSync(this.saveFolderPath);

        let result: GameMetaData[] = [];
        gameFolderList.forEach(gameFolder => {
            result.push(getGameMetaData(this.saveFolderPath + "\\" + gameFolder));
        });

        return result;
    }

    static loadChunk(gameName: string, chunkPos: number): string | null {
        let gameFolder = this.saveFolderPath + "\\" + sanitize(gameName, { replacement: "_" });

        if (!fs.existsSync(gameFolder)) return null;

        let chunkPath = gameFolder + "\\world\\" + chunkPos.toString();

        if (!fs.existsSync(chunkPath)) return null;

        return fs.readFileSync(chunkPath, { encoding: "ascii" }).toString();
    }
}

function getAppDataPath(): string {
    if (os.platform() !== "win32") throw new Error("Not implemented");

    return os.homedir() + "\\AppData\\Roaming";
}

function getGameFolderPath() {
    let folderPath = getAppDataPath() + "\\.MP";

    createFolder(folderPath);

    return folderPath;
}

function getSaveFolderPath() {
    let folderPath = getGameFolderPath() + "\\saves";

    createFolder(folderPath);

    return folderPath;
}

function saveExistGame(game: Game, gameFolder: string) {
    fs.rmSync(gameFolder, { recursive: true });

    saveNewGame(game, gameFolder);
}

function saveNewGame(game: Game, gameFolder: string) {
    fs.mkdirSync(gameFolder);

    saveMetaData(gameFolder, game.getMetaData());

    saveWorld(game.world, gameFolder);
}

function saveMetaData(folder: string, metaData: GameMetaData) {
    fs.writeFileSync(folder + "\\meta.json", JSON.stringify(metaData));
}

function getGameMetaData(folder: string): GameMetaData {
    let data = JSON.parse(fs.readFileSync(folder + "\\meta.json").toString());

    data.lastLoadedTimeStamp = new Date(data.lastLoadedTimeStamp);

    return data;
}

function saveWorld(world: World, gameFolder: string) {
    let worldFolder = gameFolder + "\\world";

    createFolder(worldFolder);

    world.chunks.forEachAll(chunk => {
        saveChunk(chunk, worldFolder);
    });
}

function saveChunk(chunk: Chunk, worldFolder: string) {
    let chunkPath = worldFolder + "\\" + chunk.pos.toString();

    fs.writeFileSync(chunkPath, chunk.getDataForSave(), { encoding: "ascii" });
}

function createFolder(path: string) {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
}
