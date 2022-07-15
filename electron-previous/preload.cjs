const {
  contextBridge,
  ipcRenderer
} = require("electron");


// functions exposed to the window.electron object in the frontend app
contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing'),
    GetVersion:() => ipcRenderer.invoke('get/version', 'version arg'),
    NameIt:() => ipcRenderer.invoke('nameit'),
    GetCounter:(callback) => ipcRenderer.on('counter',(callback)),
    write:(callback) => ipcRenderer.on('write',myJson=>callback(myJson)),
  }
)
