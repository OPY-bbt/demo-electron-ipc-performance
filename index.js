const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.webContents.openDevTools();

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
});

setTimeout(() => {
  // 在主进程中.
  ipcMain.on("message", (event, arg) => {
    console.log("main process message", typeof arg);
    // loop();
    // console.log(ipcMain, event);
    // event.send("reply", JSON.parse(JSON.stringify(arg)));
  });
}, 2000);

const loop = () => {
  const now = Date.now();

  while (Date.now() - now < 5 * 1000) {}

  console.log("loop end");
};
