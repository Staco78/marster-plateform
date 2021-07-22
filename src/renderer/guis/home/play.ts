import NewWorldMenu from "./newWorld";

export default class Play {
    // private static game_list: GameMetaData[];

    static onplay = (name: string, seed?: string) => {};

    static show() {
        let div = document.getElementById("play_menu");
        if (div) div.style.display = "block";

        let newWorldButton = document.getElementById("new_world_button");
        if (newWorldButton)
            newWorldButton.onclick = () => {
                this.hide();
                NewWorldMenu.show();
                NewWorldMenu.onCreateGame = this.onplay;
            };
    }

    static generate() {
        // let list = document.getElementById("play_menu_games_list");

        // if (!list) throw new Error("Element not found");

        // this.game_list.sort((a, b) => {
        //     if (a.lastLoadedTimeStamp < b.lastLoadedTimeStamp) return 1;
        //     if (a.lastLoadedTimeStamp > b.lastLoadedTimeStamp) return -1;
        //     return 0;
        // });

        // this.game_list.forEach(gameData => {
        //     list?.appendChild(this.generateGameRow(gameData));
        // });
    }

    private static generateGameRow(gameMetaData: GameMetaData): HTMLElement {
        let element = document.createElement("div");
        element.className = "play_menu_game_element";
        element.innerHTML = `<div>
                                <p class="play_menu_game_name_text">${gameMetaData.name}</p>
                                <p>Seed: ${gameMetaData.seed}</p>
                            </div>
                            <input type="button" value="START" class="button">`;

        (element.lastChild as HTMLElement).onclick = () => {
            this.onplay(gameMetaData.name, gameMetaData.seed);
        };

        return element;
    }

    static hide() {
        let div = document.getElementById("play_menu");
        if (div) div.style.display = "none";

        NewWorldMenu.hide();
    }
}

// export default class Play {
//     container = new Container();

//     private worldListContainer = new Container();
//     private centeredContainer = new Container();

//     private gameList = SaveManager.getGameList();

//     constructor(app: PIXI.Application) {
//         app.stage.addChild(this.container);

//         this.centeredContainer.htmlElement.style.textAlign = "center";
//         this.centeredContainer.width = window.innerWidth;
//         this.container.addElementChild(this.centeredContainer);

//         this.worldListContainer.htmlElement.style.position = "relative";

//         let worldListText = new Text("WORLD LIST", 40);
//         worldListText.htmlElement.style.position = "relative";
//         this.centeredContainer.addElementChild(worldListText);

//         this.centeredContainer.addElementChild(this.worldListContainer);

//         // this.worldListContainer.x = window.innerWidth / 2 - worldListWidth / 2;
//         this.worldListContainer.y = 180;

//         this.gameList.sort((a, b) => {
//             if (a.lastLoadedTimeStamp < b.lastLoadedTimeStamp) return 1;
//             if (a.lastLoadedTimeStamp > b.lastLoadedTimeStamp) return -1;
//             return 0;
//         });

//         this.gameList.forEach((gameData, i) => {
//             this.worldListContainer.addElementChild(new GameElement(gameData, i));
//             if (i !== this.gameList.length - 1) this.worldListContainer.addElementChild(new ListBreaker(i * 110 + 95));
//         });
//     }
// }

// class GameElement extends Container {
//     constructor(gameMetaData: GameMetaData, index: number) {
//         super();

//         this.htmlElement.style.position = "relative";
//         this.y = index * 110;

//         const nameText = new Text(gameMetaData.name, 35);
//         nameText.position.set(10, 10);
//         nameText.htmlElement.style.position = "relative";
//         this.addElementChild(nameText);

//         const seedText = new Text("Seed: " + gameMetaData.seed, 20);
//         seedText.position.set(10, 60);
//         seedText.htmlElement.style.position = "relative";
//         this.addElementChild(seedText);

//         const playButton = new Button("PLAY", { width: 150, height: 35 }, 20);
//         playButton.position.set(worldListWidth - 170, 10);
//         playButton.htmlElement.style.position = "relative";
//         this.addElementChild(playButton);
//     }
// }

// class ListBreaker extends HtmlComponent {
//     constructor(y: number) {
//         super(document.createElement("hr"));

//         this.y = y;
//         this.x = 25;

//         this.width = 600;

//         this.htmlElement.style.borderColor = "gray";
//     }
// }

// export default class Play {
//     container = new Container();

//     private worldListContainer = new Container();

//     private gameList = SaveManager.getGameList();

//     onstart = (name: string, seed: string) => {};

//     constructor(app: PIXI.Application) {
//         app.stage.addChild(this.container);
//         this.container.addElementChild(this.worldListContainer);

//         this.worldListContainer.pivot.set(-window.innerWidth / 2, -window.innerHeight / 3);

//         this.gameList.sort((a, b) => {
//             if (a.lastLoadedTimeStamp < b.lastLoadedTimeStamp) return 1;
//             if (a.lastLoadedTimeStamp > b.lastLoadedTimeStamp) return -1;
//             return 0;
//         });

//         this.gameList.forEach((game, i) => {
//             this.drawGame(game.name, game.seed, i);
//         });

//         let worldListText = new PIXI.Text("WORLDS LIST", { fontFamily: "font", fill: 0xffffff, fontSize: 40 });
//         worldListText.anchor.set(0.5, 0.5);
//         worldListText.x = window.innerWidth / 2;
//         worldListText.y = 25;
//         this.container.addChild(worldListText);

//         let newWorldButton = new Button("NEW WORLD", { width: 150, height: 35 }, 20);
//         newWorldButton.pivot.set(75, 35 / 2);
//         newWorldButton.position.set(window.innerWidth / 2, 65);
//         this.container.addChild(newWorldButton);

//         newWorldButton.on("click", () => {
//             this.container.destroy();
//             app.stage.removeChild(this.container);

//             let newWorldMenu = new NewWorldMenu(app);
//         });
//     }

//     private drawGame(name: string, seed: string, index: number) {
//         let container = new PIXI.Container();
//         container.pivot.set(800 / 2, 0);

//         container.y = index * 110;

//         this.worldListContainer.addChild(container);

//         let graphics = new PIXI.Graphics();

//         container.addChild(graphics);

//         graphics.beginFill(0x3c3c3c);
//         graphics.drawRect(0, 0, 800, 100);
//         graphics.endFill();

//         let nameText = new PIXI.Text(name, { fontFamily: "font", fill: 0xffffff, fontSize: 35 });
//         nameText.position.set(10, 10);
//         container.addChild(nameText);

//         let seedText = new PIXI.Text(`Seed: ${seed}`, { fontFamily: "font", fill: 0xffffff, fontSize: 20 });
//         seedText.position.set(10, 55);
//         container.addChild(seedText);

//         let buttonPlay = new Button("PLAY", { width: 150, height: 35 }, 20);
//         buttonPlay.position.set(620, 20);
//         container.addChild(buttonPlay);

//         buttonPlay.on("click", () => {
//             this.onstart(name, seed);
//         });
//     }
// }
