const { BrowserWindow, app} = require('electron')
const path = require('path')

let mainWindow
let window
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: true,
    icon: path.join(__dirname, '../../build/icon.png'),
  })

  // Function to allow open deezer web player webView
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = userAgent
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  });

  mainWindow.webContents.setUserAgent(userAgent)
  mainWindow.loadURL("https://www.deezer.com")
  mainWindow.maximize()
  return mainWindow
}

function quit() {
  mainWindow.destroy()
  app.quit()
}

function toggleWindow() {
  mainWindow.isVisible() ? hideWindow() : showWindow()
}

function hideWindow() {
  mainWindow.hide()
}


function showWindow() {
  mainWindow.show()
}


function setWindowAutoHide() {
  mainWindow.on("close", function (event) {
    event.preventDefault()
    hideWindow()
  })
}


module.exports = { showWindow, hideWindow, toggleWindow, quit, setWindowAutoHide, createWindow, window }
