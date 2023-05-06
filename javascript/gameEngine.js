import Ball from '/javascript/Ball.js';
import Paddle from '/javascript/Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));

let lastTime;
let playerPositionY = playerPaddle.position;
let computerPositionY = computerPaddle.position;

function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;

        if (!isPaused) {
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            if (isBot) computerPaddle.update(delta, ball.y, botLevel);
        }

        if (isLose()) handleLose();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect();
    return rect.right > window.innerWidth || rect.left < 0;
}

function handleLose() {
    const rect = ball.rect();

    if (rect.right >= window.innerWidth) {
        playGoalSound();
        playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1;
        goal("left");
    } else {
        playGoalSound();
        computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1;
        goal("right");
    }

    ball.reset();
    computerPaddle.reset();

    setBotLevel();
    console.log(botLevel);

    isPaused = true;
    waitToStart();
}

document.onload = waitToStart();

document.addEventListener('mousemove', e => {
    if (!isPaused || isStarting) playerPaddle.position = (e.y / window.innerHeight) * 100;
    playerPositionY = playerPaddle.position;
});

document.addEventListener('touchmove', e => {
    if (!isPaused || isStarting) playerPaddle.position = (e.touches[0].clientY / window.innerHeight) * 100;
    playerPositionY = playerPaddle.position;
});

// KEYBOARD CONROLS
document.addEventListener('keydown', e => {

});

document.addEventListener('keydown', e => {
    // PLAYER ONE CONTROLS
    if (e.key === 'w' && playerPositionY > 0) {
        playerPositionY -= 10;
        if (!isPaused || isStarting) playerPaddle.position = playerPositionY;
    } else if (e.key === 's' && playerPositionY < 100) {
        playerPositionY += 10;
        if (!isPaused || isStarting) playerPaddle.position = playerPositionY;
    }

    // PLAYER TWO CONTROLS
    if (e.key === 'ArrowUp' && computerPositionY > 0) {
        if (isBot) setBot();
        computerPositionY -= 10;
        if (!isPaused || isStarting) computerPaddle.position = computerPositionY;
    } else if (e.key === 'ArrowDown' && computerPositionY < 100) {
        if (isBot) setBot();
        computerPositionY += 10;
        if (!isPaused || isStarting) computerPaddle.position = computerPositionY;
    }

    // PAUSE CONTROL
    if (e.code === 'Space') setPause();

    // MUTE CONTROL
    if (e.key === 'm') setMute();

    // NEW MATCH CONTROL
    if (e.key === 'n' || e.key === 'r') document.location.reload(true);

    // BOT CONTROL
    if (e.key === 'b') setBot();
});

window.requestAnimationFrame(update);