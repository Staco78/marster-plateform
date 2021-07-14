import { app, BrowserWindow } from "electron";

function createWindow() {
	const window = new BrowserWindow({
		titleBarStyle: "hidden",
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	window.webContents.openDevTools();
	window.loadFile("dist/index.html");
}

app.on("ready", () => {
	createWindow();
});

app.on("window-all-closed", () => {
	app.quit();
});
