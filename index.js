const prev = document.querySelector(".prev");
const play = document.querySelector(".play");
const next = document.querySelector(".next");
const backward = document.querySelector(".backward");
const forward = document.querySelector(".forward");
const audio = document.querySelector("audio");
const image = document.querySelector("img");
const dummy = document.querySelector("#dummy");
const progressbar = document.querySelector(".progressbar");
const Mname = document.querySelector(".name");
const volumeBtn = document.querySelector(".vol");
const p = document.querySelector('progress');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const input = document.querySelector('input');



const musicLib = [
  {
    img: "./Images/Interstellar.jpg",
    music: "./Audio File/Interstellar.mp3",
    name: "Interstellar",
  },
  {
    img: "./Images/ludovinco.jpg",
    music: "./Audio File/Ludovico Einaudi Experience - Bgm.mp3",
    name: "Experience",
  },
  {
    img: "./Images/Your Lie In April.png",
    music: "./Audio File/Shigatsu Wa Kimi No Uso.mp3",
    name: "Your Lie In April OST",
  },
  {
    img: "./Images/Your Name.png",
    music: "./Audio File/Kimi No Na Wa Sparkle ! Kimi No Na Wa.mp3",
    name: "Sparkle",
  },
];

let i = 0;

function progress(){
  let curTime = audio.currentTime;
  let duration = audio.duration;
  progress_percentage = (curTime)*100/(duration);
  p.value = Math.floor(progress_percentage);


  let startTimeSec = Math.floor(curTime);
  if(startTimeSec<10){
    startTimeSec='0'+startTimeSec;
  }
  let startTimeMin = 0;

  let endTimeMin = 0;
  let endTimeSec = Math.floor(audio.duration);
  if(endTimeSec<10){
    endTimeSec='0'+endTimeSec;
  }

  let Etime = `${endTimeMin}:${endTimeSec}`
  let Stime = `${startTimeMin}:${startTimeSec}`

  start.innerHTML = Stime;
  end.innerHTML = Etime;

}

const playMusic = () => {
  const song = musicLib[i].name;
  Mname.innerHTML = song;
  if (!audio.paused) {
    image.classList.remove(".rotate");
    audio.pause();
    play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    image.classList.remove("rotate");
  
  } else {
    audio.play();
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    image.classList.add("rotate");
  }
};

const backwardMusic = () => {
  if (audio.currentTime - 5 >= 0) {
    audio.currentTime = audio.currentTime - 5;
    audio.play();
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    image.classList.add("rotate");
  } else {
    audio.currentTime = 0;
    audio.play();
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    image.classList.add("rotate");
  }
};
const forwardMusic = () => {
  if (audio.currentTime + 5 > audio.duration) {
    audio.currentTime = audio.duration;
    audio.play();
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    image.classList.add("rotate");
  } else {
    audio.currentTime = audio.currentTime + 5;
    audio.play();
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    image.classList.add("rotate");
  }
};
const nextTrack = () => {
  i += 1;
  i = i % 4;
  const song = musicLib[i].name;
  Mname.innerHTML = song;
  let src = musicLib[i].music;
  let img = musicLib[i].img;

  image.src = img;
  audio.src = src;

  audio.play();
  image.classList.add("rotate");

  // setInterval(progress,100);
  play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
};
const prevTrack = () => {
  i -= 1;
  if (i < 0) {
    i += 4;
  }
  i %= 4;

  const song = musicLib[i].name;
  Mname.innerHTML = song;
  let src = musicLib[i].music;
  let img = musicLib[i].img;
  console.log(img);
  image.setAttribute("src", img);
  audio.src = src;

  audio.play();
  image.classList.add("rotate");

  // setInterval(progress,100);
  play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
};

input.classList.add('hidden');

function controlVolume(){
  input.classList.remove('hidden');
  let vol = input.value;
  vol/=100;
  console.log(vol);
  audio.volume = vol;
}

function muteVolume(){
  
}

volumeBtn.addEventListener('click',muteVolume);
volumeBtn.addEventListener('mouseover',controlVolume);
volumeBtn.addEventListener('mouseout',()=>{
  input.classList.add('hidden')
});
forward.addEventListener("click", forwardMusic);
backward.addEventListener("click", backwardMusic);
play.addEventListener("click", playMusic);
next.addEventListener("click", nextTrack);
prev.addEventListener("click", prevTrack);

const check = () => {
  if (audio.currentTime === audio.duration) {
    console.log("track ended");
    i += 1;
    nextTrack();
  }
};

const time = setInterval(check, 1000);
setInterval(progress,950);

