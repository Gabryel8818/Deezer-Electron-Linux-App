 const { Menu, Tray, app, Notification, BrowserView, BrowserWindow  } = require('electron')
 const path = require('path')
 const { quit, toggleWindow } = require('../window/window.js')

let tray
let isLinux = process.platform === "linux"


function miniView(dimensions, window){
  miniView = new BrowserWindow({
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  })

  // Remove default menu in miniView Web Player
  miniView.setMenu(null)
  miniView.webContents.openDevTools()



  //Prevent from closing in miniview, hides instead of closing
  miniView.on("close", function (event) {
    event.preventDefault()
    miniView.hide()
  })


  // Create browserview from load html page, in size of the screen
  const view = new BrowserView()
  miniView.setBrowserView(view)
  miniView.setBounds({ x: dimensions.width + 1920, y: dimensions.height + 1080, width: 380, height: 575 })
  miniView.webContents.loadFile(path.join(__dirname, "../miniWebPlayer/index.html"))
}


function createTray(window){
  tray = new Tray(path.join(__dirname, '../../assets/deezer.png'),)
  const contextMenu = Menu.buildFromTemplate([
     {
       label: 'Pause', async click() {
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

        // After 1 second, send notification for next song name
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
        app.whenReady().then( async () => {
          const { screen, ipcMain } = require('electron')

          const primaryDisplay = screen.getPrimaryDisplay()
          miniView({ width: primaryDisplay.bounds.x, height: primaryDisplay.bounds.y})

          // Send title song on process main for renderer process
          ipcMain.on('title', async (event, data) => {
            const artistName = await window.webContents.executeJavaScript("dzPlayer.getArtistName();")
            const titleTrack = await window.webContents.executeJavaScript("dzPlayer.getAlbumTitle();")
            const song = await window.webContents.executeJavaScript("dzPlayer.getCurrentSong();")

            const value = {artist:`${artistName}`,titleTrack: `${titleTrack}`,imageSong: `https://api.deezer.com/album/${song.ALB_ID}/image?size=big` }
            event.reply(data.waitingEventName, value);
          });


           // Send next Song function
          ipcMain.on('next-song', async (event, data) => {
              const nextSong = window.webContents.executeJavaScript("dzPlayer.control.nextSong();")
              const artistName = await window.webContents.executeJavaScript("dzPlayer.getArtistName();")
              const titleTrack = await window.webContents.executeJavaScript("dzPlayer.getAlbumTitle();")
              const song = await window.webContents.executeJavaScript("dzPlayer.getCurrentSong();")

              console.log(`Artista: ${artistName} Titulo: ${titleTrack}`)

              const value = {artist:`${artistName}`,titleTrack: `${titleTrack}`,imageSong: `https://api.deezer.com/album/${song.ALB_ID}/image?size=big` }
              event.reply(data.waitingEventName, value);

          });

          // Send Prev Song
          ipcMain.on('prev-song', async (event, data) => {
            const nextSong = window.webContents.executeJavaScript("dzPlayer.control.prevSong();")
            const artistName = await window.webContents.executeJavaScript("dzPlayer.getArtistName();")
            const titleTrack = await window.webContents.executeJavaScript("dzPlayer.getAlbumTitle();")
            const song = await window.webContents.executeJavaScript("dzPlayer.getCurrentSong();")

            console.log(`Artista: ${artistName} Titulo: ${titleTrack}`)

            const value = {artist:`${artistName}`,titleTrack: `${titleTrack}`,imageSong: `https://api.deezer.com/album/${song.ALB_ID}/image?size=big` }
            event.reply(data.waitingEventName, value);

        });

        ipcMain.on('play-pause-song', async (event, data) => {
          window.webContents.executeJavaScript("dzPlayer.control.togglePause();")
          let status = pause;
          event.reply(data.waitingEventName, status);

      });

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
