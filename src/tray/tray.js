 const { Menu, Tray, app, globalShortcut, Notification, BrowserView, BrowserWindow, screen  } = require('electron')
 const path = require('path')
 const { quit, toggleWindow, createWindow, windowTeste  } = require('../window/window.js')

let tray
let isLinux = process.platform === "linux"


function miniView(dimensions){
  miniView = new BrowserWindow({
    useContentSize: true
  })
  miniView.setMenu(null)

  const view = new BrowserView()
  miniView.setBrowserView(view)
  console.log(dimensions)
  miniView.setBounds({ x: dimensions.width + 1920, y: dimensions.height + 1080, width: 400, height: 400 })
  miniView.webContents.loadFile(path.join(__dirname, "../../index.html"))
}





function createTray(window){
  tray = new Tray(path.join(__dirname, '../../assets/deezer.png'),)
  const contextMenu = Menu.buildFromTemplate([
     {
       label: 'Pause', click() {
         window.webContents.executeJavaScript("dzPlayer.control.pause();")
         }
     },
     {
       label: 'Play', async click(){
         window.webContents.executeJavaScript("dzPlayer.control.togglePause();")
       }
     },
     {
      label: 'Next', click() {
        window.webContents.executeJavaScript("dzPlayer.control.nextSong();")
        setTimeout( async function () {
          const titleTrack = await window.webContents.executeJavaScript("document.getElementsByClassName('track-link')[0].innerText")
          const NOTIFICATION_TITLE = `${titleTrack}`
          const NOTIFICATION_BODY = `Música: ${titleTrack}`
          new Notification({title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY}).show()
        }, 1000);
        }
    },
    {
      label: "Prev", click(){
          window.webContents.executeJavaScript("dzPlayer.control.prevSong();")
      }
    },
        {
      type: 'separator'
    },
    {
      label: 'Mini View', click(){ 
        app.whenReady().then( () => {
          const { screen } = require('electron')
          const primaryDisplay = screen.getPrimaryDisplay()
          miniView({ width: primaryDisplay.bounds.x, height: primaryDisplay.bounds.y})      
         })
       }
    },
    {
      type: 'separator'
    },
    {
      label: 'Show', click(){ toggleWindow(); }
    },
    {
       label: 'Quit', click() { quit(); }
     }
  ])

  //Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  if (isLinux) {
    tray.setContextMenu(contextMenu)

  }

  return tray;
}

module.exports = { createTray, miniView }
