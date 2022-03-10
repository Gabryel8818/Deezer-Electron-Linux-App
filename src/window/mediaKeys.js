const { globalShortcut } = require('electron')
const { window } = require('./window.js')




function registerMediakeys(window) {
  globalShortcut.register('medianexttrack', function () {
    window.webContents.executeJavaScript("dzPlayer.control.nextSong();")
  })
  globalShortcut.register('mediaplaypause', function () {
    window.webContents.executeJavaScript("dzPlayer.control.togglePause();")
  })
  globalShortcut.register('mediaprevioustrack', function () {
    window.webContents.executeJavaScript("dzPlayer.control.prevSong();")
  })
  globalShortcut.register('mediastop', function () {
    window.webContents.executeJavaScript("dzPlayer.control.pause();")
  })
}


module.exports = { registerMediakeys }
