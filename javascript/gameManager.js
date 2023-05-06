let isStarting = false;
let isPaused = true;
let isBot = true;

let botLevel = 1;

const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');

const infoSection = document.querySelector('.info-section');
const infoElement = document.getElementById('info');

const goalMark = document.getElementById('goal-mark');

const botImage = document.getElementById('bot-img');
const botButton = document.getElementById('bot-button');

const pauseImage = document.getElementById('pause-img');
const pauseButton = document.getElementById('pause-button');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitToStart() {
    isStarting = true;
    infoSection.style.display = "flex";
    playCountdownSound();
    infoElement.textContent = 3;
    await sleep(1000);
    playCountdownSound();
    infoElement.textContent = 2;
    await sleep(1000);
    playCountdownSound();
    infoElement.textContent = 1;
    await sleep(1000);
    playGoSound();
    infoElement.textContent = "GO!";
    await sleep(500);
    isPaused = false;
    isStarting = false;
    infoSection.style.display = "none";
}

function setPause() {
    if (!isStarting) {
        if (isPaused) {
            infoSection.style.display = "none";
            waitToStart();
            pauseImage.src = 'images/icon-pause.png'
            pauseButton.style.backgroundColor = 'var(--info-color)';
        }
        else {
            isPaused = true;
            infoSection.style.display = "flex";
            infoElement.textContent = "PAUSE";
            pauseImage.src = 'images/icon-play.png'
            pauseButton.style.backgroundColor = 'var(--foreground-color)';
        }
    }
}

function setBot() {
    if (isBot) {
        isBot = false;
        botImage.src = 'images/icon-bot-off.png'
        botButton.style.backgroundColor = 'var(--foreground-color)';
    } else {
        isBot = true;
        botImage.src = 'images/icon-bot-on.png'
        botButton.style.backgroundColor = 'var(--info-color)';
    }
}

function setBotLevel() {
    let playerScore = parseInt(playerScoreElement.textContent);
    let computerScore = parseInt(computerScoreElement.textContent);
    let goalDiference = Math.abs(playerScore - computerScore);

    if (playerScore >= computerScore && goalDiference < 3) botLevel = 1;
    else if (playerScore >= computerScore && goalDiference < 6) botLevel = 1.5;
    else if (playerScore >= computerScore && (goalDiference < 9 || goalDiference > 9)) botLevel = 2;
    else if (playerScore < computerScore) botLevel = 1.5;
}

async function goal(position) {
    goalMark.style.justifyContent = position;
    goalMark.style.display = "flex";
    await sleep(1000);
    goalMark.style.display = "none";
}
