/*
 * @Date: 2021-11-02 16:49:52
 * @LastEditors: tortorse
 * @LastEditTime: 2021-11-03 13:02:55
 * @FilePath: \web-samples\web-audio\index.js
 */
const music = new Audio("music.mp3");

const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
const volumeHandler = document.querySelector("#volume");

playButton.addEventListener("click", () => {
  play();
});

pauseButton.addEventListener("click", () => {
  pause();
});

stopButton.addEventListener("click", () => {
  stop();
});

volumeHandler.addEventListener("input", (e) => {
  music.volume = e.target.value / 100;
});

music.addEventListener("canplay", () => {
  document.querySelector("#progress").max = music.duration;
});

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

const pause = () => {
  music.pause();
};
