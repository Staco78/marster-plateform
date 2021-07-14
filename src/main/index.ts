import { app, BrowserWindow } from "electron";

function createWindow() {
    const window = new BrowserWindow({
        titleBarStyle: "hidden",
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    window.loadFile("static/index.html");
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});
