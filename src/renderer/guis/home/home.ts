import Play from "./play";

export default class Home {
    static onplay = (name: string, seed?: string) => {};

    static show() {
        let container = document.getElementById("menu_container");
        if (!container) throw new Error("Cannot found menu container element");

        container.style.width = window.innerWidth + "px";
        container.style.height = window.innerHeight + "px";

        Play.onplay = this.onplay;
        Play.generate();
        Play.show();
    }

    static hide() {
        Play.hide();
    }
}

// export default class Home {
//     container = new Container;

//     onstart = (name: string, seed: string) => {};

//     constructor(app: PIXI.Application) {
//         app.stage.addChild(this.container);

//

//         let startButton = new Button("START", { width: 400, height: 70 }, 50);
//         this.container.addElementChild(startButton);

//         startButton.on("click", () => {
//             this.container.destroy();
//             app.stage.removeChild(this.container);

//             let playMenu = new Play(app);

//         });
//     }
// }
