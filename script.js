// Select DOM elements
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audioEl = document.querySelector("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const coverImg = document.querySelector(".img-container img");

const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress");

const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("duration");

const songs = [
  {
    songName: "A Story About Time",
    cover: "kazam.jpg",
    artistName: "Kazam",
  },
  {
    songName: "Going In For Life",
    cover: "drake.jpg",
    artistName: "Drake",
  },
  {
    songName: "Hey Ya",
    cover: "sweater-beats.jpg",
    artistName: "Sweater Beats & KAMAU",
  },
];

let isPlaying = false;

/* Play Song */
function togglePlay() {
  if (!isPlaying) {
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    audioEl.play();
  } else {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    audioEl.pause();
  }

  isPlaying = !isPlaying;
}

let currentSongIndex = 0;

/* Previous/Next Song */
function changeSong(direction) {
  if (direction === "next") {
    currentSongIndex++;
    if (currentSongIndex === songs.length) {
      currentSongIndex = 0;
    }
  } else {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
  }
  loadSong(songs[currentSongIndex]);
  isPlaying = !isPlaying;

  togglePlay();
}

function loadSong(song) {
  title.textContent = song.songName;
  artist.textContent = song.artistName;
  coverImg.src = `img/${song.cover}`;
  audioEl.src = `audio/${song.songName}.mp3`;
  currentTimeEl.textContent = "0:00";
  progressBar.style.width = "0%";
}

/* Progress Bar */
function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    calcSongTime(duration, totalDurationEl);
    calcSongTime(currentTime, currentTimeEl);
  }
}

function calcSongTime(timeUnit, DOMEl) {
  const minutes = Math.floor(timeUnit / 60);
  const seconds = Math.floor(timeUnit % 60);

  if (seconds) {
    DOMEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }
}

function updateSongProgress(event) {
  const { duration } = audioEl;

  const boxWidth = this.clientWidth;
  const offsetXWidth = event.offsetX;

  const songProgress = (offsetXWidth / boxWidth) * duration;

  audioEl.currentTime = songProgress;
  progressBar.style.width = `${songProgress}%`;
}

// Event handlers
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", () => changeSong("next"));
prevBtn.addEventListener("click", () => changeSong("prev"));
audioEl.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", updateSongProgress);
