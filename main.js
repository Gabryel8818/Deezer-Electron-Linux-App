// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')
const { size } = require("./shared")
const { showWindow, hideWindow, quit, window, createWindow, setWindowAutoHide, mainWindow, toggleWindow  } = require('./src/window/window.js')
const { createTray } = require("./src/tray/tray.js")

app.on('ready', () => {
  createWindow()
  setWindowAutoHide()
  createTray()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
