
const path  = require('path');
const { ipcRenderer, remote } = require('electron')
//const { createWindow } = remote ;


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




// Next Music
nextBtn.addEventListener("click", () => {
  const send =(callback)=>{
      const waitingEventName = 'next-song-reply';
      ipcRenderer.once(waitingEventName, (event, data) => {
          callback(data);
      });
      ipcRenderer.send('next-song', {waitingEventName});
  };
  send((value)=> {
        musicArtist.innerText = value.artist;
        musicName.innerText = value.titleTrack
        musicImg.src = value.imageSong
  });

})


// Prev Music
prevBtn.addEventListener("click", () => {
    const send =(callback)=>{
        const waitingEventName = 'prev-song-reply';
        ipcRenderer.once(waitingEventName, (event, data) => {
            callback(data);
        });
        ipcRenderer.send('prev-song', {waitingEventName});
    };
    send((value)=> {
          musicArtist.innerText = value.artist;
          musicName.innerText = value.titleTrack
          musicImg.src = value.imageSong
    });
})



// Next Music
prevBtn.addEventListener("click", () => {
    const send =(callback)=>{
        const waitingEventName = 'prev-song-reply';
        ipcRenderer.once(waitingEventName, (event, data) => {
            callback(data);
        });
        ipcRenderer.send('play-pause-song', {waitingEventName});
    };
    send((value)=> {
        if(value.status === "paused"){
            value.status = "played"
            document.getElementById("play_arrow").style.display = "block"
            document.getElementById("pause_arrow").style.display = "none"

        }else if(value.status =="played"){
          value.status == "paused"
          document.getElementById("play_arrow").style.display = "none"
          document.getElementById("pause_arrow").style.display = "block"
        }
    });
})
