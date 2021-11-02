const music = new Audio("music.mp3");

const playButton = document.querySelector("#play");
const stopButton = document.querySelector("#stop");

playButton.addEventListener("click", () => {
  play();
});

stopButton.addEventListener("click", () => {
  stop();
});



music.addEventListener("canplay", () => {
  document.querySelector("#progress").max = music.duration;
})

music.addEventListener("timeupdate", () => {
  document.querySelector("#progress").value = music.currentTime;
});

const play = () => {
  music.play();
};

const stop = () => {
  music.pause();
  music.currentTime = 0;
};
