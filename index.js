const prev = document.querySelector(".prev");
const play = document.querySelector(".play");
const next = document.querySelector(".next");
const backward = document.querySelector(".backward");
const forward = document.querySelector(".forward");
const audio = document.querySelector("audio");
const image = document.querySelector('img');
const dummy = document.querySelector('#dummy');
const progressbar = document.querySelector('.progressbar');


const musicLib = [
    {
        img: "./Images/Interstellar.jpg",
        music:  "./Audio File/Interstellar.mp3"
    },
    {
        img: "./Images/ludovinco.jpg",
        music:  "./Audio File/Ludovico Einaudi Experience - Bgm.mp3"
    },
    {
        img: "./Images/Your Lie In April.png",
        music:  "./Audio File/Shigatsu Wa Kimi No Uso.mp3"
    },
    {
        img: "./Images/Your Name.png",
        music: "./Audio File/Kimi No Na Wa Sparkle ! Kimi No Na Wa.mp3"
    }
]


let i = 0;

function progress(){
  let p = document.getElementsByClassName('myprogressBar')
  progress_percentage = Math.floor((audio.currentTime)/(audio.duration))*100;
  p.style.width = progress_percentage + .1;
}


const playMusic = () => {
  console.log(audio.paused);
  if (!audio.paused) {
    image.classList.remove('.rotate')
    audio.pause();
    play.innerHTML = `<i class="fa-solid fa-play"></i>`
    image.classList.remove('rotate');
  } else {
    audio.play();
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`
    image.classList.add('rotate');
  }
};

const backwardMusic = () => {
  if (audio.currentTime - 5 >= 0) {
    audio.currentTime = audio.currentTime - 5;
    audio.play();
  }else{
    audio.currentTime = 0;
    audio.play();
  }
};
const forwardMusic = () => {
  if (audio.currentTime + 5 > audio.duration) {
    audio.currentTime = audio.duration;
    audio.play();
  }else{
    audio.currentTime = audio.currentTime + 5;
    audio.play();
  }
};
const nextTrack = () => {
  console.log("nextTrack");
    let src = musicLib[i].music;
    let img = musicLib[i].img;

    image.src=img;
    audio.src=src;

    audio.play();
    setInterval(progress,100);
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`

    i+=1;
    i = i%4;
}
const prevTrack = () => {
  console.log("prevTrack");
    let src = musicLib[i].music; 
    let img = musicLib[i].img;
    console.log(img);
    image.setAttribute(
        'src',
        img
    );
    audio.src=src;

    audio.play();
    setInterval(progress,100);
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`

    i-=1;
    i%=4;
}

forward.addEventListener("click", forwardMusic);
backward.addEventListener("click", backwardMusic);
play.addEventListener("click", playMusic);
next.addEventListener("click", nextTrack);
prev.addEventListener("click", prevTrack);

const check = () => {
  if(audio.currentTime === audio.duration){
    console.log('track ended');
    i+=1;
    nextTrack();
  }
}

const time = setInterval(check,1000);

