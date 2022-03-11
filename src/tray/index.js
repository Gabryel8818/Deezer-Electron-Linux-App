
const path  = require('path');
const { ipcRenderer } = require('electron')
//const windowTeste = require('../../main.js')

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");



// Listening main process 
const send =(callback)=>{
    const waitingEventName = 'title-reply';
    ipcRenderer.once(waitingEventName, (event, data) => {
        callback(data);
    });
    ipcRenderer.send('title', {waitingEventName});
};
send((value)=>{
    musicArtist.innerText = value.artist;
    musicName.innerText = value.titleTrack
    musicImg.src = value.imageSong

    
});

// nextBtn.addEventListener("click", () => {
//     windowTeste.webContents.executeJavaScript("dzPlayer.control.nextSong();")
// })

