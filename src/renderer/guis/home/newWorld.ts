export default class NewWorldMenu {
    static onCreateGame = (name: string, seed?: string) => {};

    static show() {
        let div = document.getElementById("new_world_menu");
        if (div) div.style.display = "block";

        let button = document.getElementById("new_world_create_world_button");
        if (!button) throw new Error("Element not found");
        button.onclick = () => {
            let name_input = document.getElementById("new_world_name_input") as HTMLInputElement | null;
            if (!name_input) throw new Error("Element not found");

            let seed_input = document.getElementById("new_world_seed_input") as HTMLInputElement | null;
            if (!seed_input) throw new Error("Element not found");

            let name = name_input.value;
            let seed: string | undefined = seed_input.value;

            if (!name) {
                alert("Name required");
                return;
            }

            if (!seed) seed = undefined;

            this.onCreateGame(name, seed);
        };
    }

    static hide() {
        let div = document.getElementById("new_world_menu");
        if (div) div.style.display = "none";
    }
}
