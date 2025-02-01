const video = document.getElementById("videoPlayer");
const fileInput = document.getElementById("fileInput");
const seekBar = document.getElementById("seekBar");
const speedControl = document.getElementById("speedControl");
const volumeControl = document.getElementById("volumeControl");
const timeDisplay = document.getElementById("timeDisplay");

// 파일 업로드 시 처리
fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        video.src = fileURL;
        video.load();
        video.play();
    }
});

// 재생/일시정지
function playPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// 정지
function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

// 음소거/음소거 해제
function muteUnmute() {
    video.muted = !video.muted;
}

// 재생 바 업데이트
video.addEventListener("timeupdate", () => {
    seekBar.value = (video.currentTime / video.duration) * 100;
    updateRemainingTime();
});

// 재생 바 이동
seekBar.addEventListener("input", () => {
    video.currentTime = (seekBar.value / 100) * video.duration;
});

// 속도 조절
speedControl.addEventListener("change", function () {
    video.playbackRate = parseFloat(this.value);
});

// 볼륨 조절
volumeControl.addEventListener("input", function () {
    video.volume = parseFloat(this.value);
});

// 전체 화면 전환
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 남은 시간 표시
function updateRemainingTime() {
    const remainingTime = video.duration - video.currentTime;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);
    timeDisplay.textContent = `남은 시간: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
