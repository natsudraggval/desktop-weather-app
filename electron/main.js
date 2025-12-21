const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
  });

  // For dev
  // win.loadURL("http://localhost:5173");

  //For Prod. build
  win.loadFile(path.join(__dirname, "../react-ui/dist/index.html"));
}

app.whenReady().then(createWindow);
