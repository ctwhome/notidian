const { app, ipcMain, BrowserWindow } = require("electron");
const serve = require("electron-serve");
const ws = require("electron-window-state");

const path = require('path')

try {
  require("electron-reloader")(module);
} catch {
}


const loadURL = serve({ directory: "." });
const port = process.env.PORT || 3000;
const isdev = !app.isPackaged || (process.env.NODE_ENV == "development");
let mainwindow;


const fs = require('fs');

// let rawdata = fs.readFileSync(path.resolve(__dirname, '../.notidian/student.json'));
let rawdata = fs.readFileSync('./.notidian/student.json');
let student = JSON.parse(rawdata);
console.log(student);

function loadVite(port) {
  mainwindow.loadURL(`http://127.0.0.1:${port}`).catch((err) => {
    setTimeout(() => { loadVite(port); }, 1000);
  });
}

function createMainWindow() {
  let mws = ws({
    defaultWidth: 1000,
    defaultHeight: 800
  });




  mainwindow = new BrowserWindow({
    /*Hide the bar but not the traffic lighs */
    titleBarStyle: 'hidden',
    // trafficLightPosition: { x: 10, y: 10 },
    // title: "✏️ Notidian",
    x: mws.x,
    y: mws.y,

    width: mws.width,
    height: mws.height,

    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: true,
      devTools: isdev,
      preload: path.join(__dirname, "preload.cjs") // use a preload script
    }
  });


  mainwindow.once("close", () => {
    mainwindow = null;
  });

  if (!isdev) mainwindow.removeMenu();
  else mainwindow.webContents.openDevTools();

  mws.manage(mainwindow);

  if (isdev) loadVite(port);
  else loadURL(mainwindow);




  // ipcMain.on("titlebar", (event, arg) => {
  //   console.log("🎹 event",event );
  //   if(arg === "destroy") window.destroy();
  //   else if(arg === "kill") app.quit();
  //   else if(arg === "minimize") window.minimize();
  //   else if(arg === "resize") {
  //     if(window.isMaximized()) window.unmaximize();
  //     else window.maximize();
  //   }
  // })

  function writetofile() {
    let configsettings = {
      break: output.innerHTML,
      alwaysonoff: toggleoutput.innerHTML,
    };

    let settings_data = JSON.stringify(configsettings, null, 2);

    const fs = require("fs");

    fs.writeFileSync("assets/configs/settings.json", settings_data);
  }

}

app.once("ready", createMainWindow);
app.on("activate", () => {
  if (!mainwindow) createMainWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

let counter = 0
setInterval(() => {
  counter++
  mainwindow.webContents.send("counter", counter)
},1000)


ipcMain.handle('get/version',()=>"mi cosa")
ipcMain.handle('nameit', async (event, arg) => {
  console.log(arg);
  return "hello sveltekit"
})
