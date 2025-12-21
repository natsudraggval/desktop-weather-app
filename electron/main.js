const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
  });

  win.loadFile(
    path.join(__dirname, "../react-ui/dist/index.html")
  );
}

app.whenReady().then(createWindow);
