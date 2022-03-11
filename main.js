// Modules to control application life and create native browser window
const { app } = require('electron')
const fs = require('fs')
const { createWindow, setWindowAutoHide } = require('./src/window/window.js')
const { createTray } = require("./src/tray/tray.js")

app.on('ready', () => {
  const windowTeste = createWindow()
  setWindowAutoHide()
  const createdTray = createTray(windowTeste)
})



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
