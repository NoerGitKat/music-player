// Select DOM elements
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.querySelector("audio");

let isPlaying = false;

function togglePlay() {
  if (!isPlaying) {
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    audio.play();
  } else {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    audio.pause();
  }

  isPlaying = !isPlaying;
}

// Event handlers
playBtn.addEventListener("click", togglePlay);
