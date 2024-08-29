let musics = [
    {
        name: "Aram Aram",
        image: "images/Reza-Malekzadeh-Aram-Aram.jpg",
        audio: new Audio("music/aram_aram guitar version.mp3"),
        singer: "Reza Malekzadeh"
    },
    {
        name: "Abr Mibarad",
        image: "images/Homayoun-Shajarian-Rage-Khab.jpg",
        audio: new Audio("music/Homayoun Shajarian Abr Mibarad.mp3"),
        singer: "Homayoun Shajarian"
    },
    {
        name: "Daylight",
        image: "images/David_Kushner-_Daylight.png",
        audio: new Audio("music/daylight_david_kushner.mp3"),
        singer: "David Kushner"
    }
]


let title = document.querySelector("title")
let musicName = document.getElementById("music-name")
let singer = document.getElementById("singer")
let image = document.getElementById("music-img")
let time = document.getElementById("music-time")
let range = document.getElementById("music-range")
let playBtn = document.getElementById("play-btn")
let nextBtn = document.getElementById("next-btn")
let preBtn = document.getElementById("pre-btn")
let rptBtn = document.getElementById("rpt-btn")
let volumeRange = document.getElementById("volume-range")
let volumeBtn = document.getElementById("volume-btn")
let audioSpeed = document.getElementById("speed")


let currentMusic = 0
title.innerText = `Music Player - ${musics[currentMusic].name} - ${musics[currentMusic].singer}`
let audio = musics[currentMusic].audio
musicName.innerText = musics[currentMusic].name
singer.innerText = musics[currentMusic].singer
image.src = musics[currentMusic].image
image.alt = `${musics[currentMusic].name} - ${musics[currentMusic].singer}`

// if(audio.currentTime == audio.duration){
//     changeMusic("next")
// }


audio.addEventListener("canplay", (e)=>{
    range.max = audio.duration
    volumeRange.max = audio.volume*8
})

let is2X = false
audioSpeed.addEventListener("click", (e)=>{
    if(is2X != true){
        audio.playbackRate = 2
        audioSpeed.innerText = "2X"
    } else{
        audio.playbackRate = 1
        audioSpeed.innerText = "1X"
    }
    is2X = !is2X
})

audio.addEventListener("timeupdate", (e)=>{
    let second = Math.floor(audio.currentTime % 60)
    second = String(second).padStart(2, '0')
    let second2 = Math.floor(audio.duration % 60)
    second2 = String(second2).padStart(2, '0')

    let minute = Math.floor(audio.currentTime / 60)
    let minute2 = Math.floor(audio.duration / 60)

    time.innerText = `${minute}:${second} / ${minute2}:${second2}`
    range.value = audio.currentTime
})
range.addEventListener("input", (e)=>{
    audio.currentTime = range.value
})

let isClicked = false
volumeRange.addEventListener("input", (e)=>{
    audio.volume = volumeRange.value/8
    console.log(audio.volume);
    
    if(audio.volume <= 0){
        volumeBtn.className = "fas fa-volume-mute"
        isClicked = !isClicked
    } else if(audio.volume <= 0.4){
        volumeBtn.className = "fas fa-volume-off"
    } else if(audio.volume <= 0.7){
        volumeBtn.className = "fas fa-volume-down"
    }
    else if(audio.volume <= 1){
        volumeBtn.className = "fas fa-volume-up"
        isClicked = !isClicked
    }

})
volumeBtn.addEventListener("click", (e)=>{
    if(isClicked != true){
        volumeBtn.className = "fas fa-volume-mute"
        audio.volume = 0
        volumeRange.value = 0
    } else{
        volumeBtn.className = "fas fa-volume-up"
        audio.volume = 1
        volumeRange.value = 8
    }
    isClicked = !isClicked
})

playBtn.addEventListener("click", (e)=>{
    if(audio.paused){
        audio.play()
        image.style.animationPlayState = "running"
        playBtn.className = "fas fa-pause"
    } else{
        audio.pause()
        image.style.animationPlayState = "paused"
        playBtn.className = "fas fa-play"
    }
})


let isClick = false
rptBtn.addEventListener("click",()=>{

    if(isClick != true){
        rptBtn.style = "color:orange; text-shadow: 0 0 2px #000"
        audio.addEventListener("ended", ()=>{
            audio.currentTime = 0
            range.value = 0
            audio.play()
            image.style.animationPlayState = "running"
            playBtn.className = "fas fa-pause"
        })  
    } else{
        rptBtn.style = "color:#fff; text-shadow: none"
    }
    isClick = !isClick

})

nextBtn.addEventListener("click", (e)=>{
    changeMusic("next")
})

preBtn.addEventListener("click", (e)=>{
    changeMusic("pre")
})

audio.addEventListener("ended", (e)=>{
    audio.pause()
    range.value = 0
    image.style.animationPlayState = "paused"
    playBtn.className = "fas fa-play"
    audio.currentTime = 0
})

function changeMusic(state){
    
    audio.pause()
    range.value = 0
    image.style.animationPlayState = "paused"
    playBtn.className = "fas fa-play"
    audio.currentTime = 0
    volumeRange.value = 8
    audio.volume = 1
    volumeBtn.className = "fa fa-volume-up"
    

    if(state == "next"){
        if(currentMusic == musics.length - 1){
            currentMusic = 0
        } else{
            currentMusic += 1
        }
    } else{
        if(currentMusic == 0){
            currentMusic = musics.length - 1
        } else{
            currentMusic -= 1
        }
    }


    title.innerText = `Music Player - ${musics[currentMusic].name} - ${musics[currentMusic].singer}`
    audio = musics[currentMusic].audio
    musicName.innerText = musics[currentMusic].name
    singer.innerText = musics[currentMusic].singer
    image.src = musics[currentMusic].image
    image.alt = `${musics[currentMusic].name} - ${musics[currentMusic].singer}`

    audio.addEventListener("timeupdate", (e)=>{
        let second = Math.floor(audio.currentTime % 60)
        second = String(second).padStart(2, '0')
        let second2 = Math.floor(audio.duration % 60)
        second2 = String(second2).padStart(2, '0')
    
        let minute = Math.floor(audio.currentTime / 60)
        let minute2 = Math.floor(audio.duration / 60)
    
        time.innerText = `${minute}:${second} / ${minute2}:${second2}`
        range.value = audio.currentTime    

    })
    audio.addEventListener("canplay", (e)=>{
        range.max = audio.duration
    })

}