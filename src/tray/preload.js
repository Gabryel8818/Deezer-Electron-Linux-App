const { ipcRenderer, ipcMain } = require('electron');
const electron = require('electron');
const contextBridge= electron.contextBridge;

contextBridge.exposeInMainWorld(
    "api", {
        loadPreferences: () => ipcMain.invoke('title-reply'),
        loadPreferences: () => ipcRenderer.invoke('title'),
        loadscript(filename){
            require(filename);
        }
    }
);
