 const { Menu, Tray, app, globalShortcut } = require('electron')
 const path = require('path')
 const { quit, toggleWindow, mainWindow } = require('../window/window.js')

let tray
let isLinux = process.platform === "linux"

function createTray(){
  tray = new Tray(path.join(__dirname, '../../assets/deezer.png'),)
  const contextMenu = Menu.buildFromTemplate([
    {
       label: 'Show', click(){ toggleWindow(); }
     },
     {
       label: 'Pause', click() {
         globalShortcut.register('mediastop', function () {
           //mainWindow.webContents.executeJavaScript("dzPlayer.control.pause();")
           console.log("Pause foi pressionado")
         })}
     },
    {
      label: 'Quit', click() { quit(); }
    },

  ])

  //Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  if (isLinux) {
    tray.setContextMenu(contextMenu)
  }
}

module.exports = { createTray }
