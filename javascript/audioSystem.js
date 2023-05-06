let isMuted = true;

const paddleSound = new Audio('/audio/paddle.mp3');
const wallSound = new Audio('/audio/wall.mp3');
const goalSound = new Audio('audio/goal.mp3');
const countdownSound = new Audio('/audio/countdown.mp3');
const goSound = new Audio('/audio/go.mp3');

const muteImg = document.getElementById('mute-img');
const muteButton = document.getElementById('mute-button');
 
function playPaddleSound() {
    if (!isMuted) paddleSound.play();
}

function playWallSound() {
    if (!isMuted) wallSound.play();
}

function playGoalSound() {
    if (!isMuted) goalSound.play();
}

function playCountdownSound() {
    if (!isMuted) countdownSound.play();
}

function playGoSound() {
    if (!isMuted) goSound.play();
}

function setMute() {
    if (isMuted) {
        isMuted = false;
        muteImg.src = 'images/icon-mute-off.png'
        muteButton.style.backgroundColor = 'var(--info-color)';
    } else {
        isMuted = true;
        muteImg.src = 'images/icon-mute-on.png'
        muteButton.style.backgroundColor = 'var(--foreground-color)';
    }
}