const paddleSpeed = 5;
const ballSpeed = 5;

const gameArea = document.querySelector('.game-area');
const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const ball = document.getElementById('ball');

let leftPaddleY = gameArea.clientHeight / 2 - leftPaddle.clientHeight / 2;
let rightPaddleY = gameArea.clientHeight / 2 - rightPaddle.clientHeight / 2;
let ballX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
let ballY = gameArea.clientHeight / 2 - ball.clientHeight / 2;
let ballDX = ballSpeed;
let ballDY = ballSpeed;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    }
    if (e.key === 'ArrowDown' && rightPaddleY + rightPaddle.clientHeight < gameArea.clientHeight) {
        rightPaddleY += paddleSpeed;
    }
    if (e.key === 'w' && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    }
    if (e.key === 's' && leftPaddleY + leftPaddle.clientHeight < gameArea.clientHeight) {
        leftPaddleY += paddleSpeed;
    }
});

function update() {
    leftPaddle.style.top = leftPaddleY + 'px';
    rightPaddle.style.top = rightPaddleY + 'px';
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY + ball.clientHeight >= gameArea.clientHeight) {
        ballDY = -ballDY;
    }

    // Ball collision with paddles
    if (ballX <= leftPaddle.clientWidth && ballY + ball.clientHeight >= leftPaddleY && ballY <= leftPaddleY + leftPaddle.clientHeight) {
        ballDX = -ballDX;
    }

    if (ballX + ball.clientWidth >= gameArea.clientWidth - rightPaddle.clientWidth && ballY + ball.clientHeight >= rightPaddleY && ballY <= rightPaddleY + rightPaddle.clientHeight) {
        ballDX = -ballDX;
    }

    // Ball out of bounds
    if (ballX <= 0 || ballX + ball.clientWidth >= gameArea.clientWidth) {
        // Reset ball position
        ballX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
        ballY = gameArea.clientHeight / 2 - ball.clientHeight / 2;
    }

    ballX += ballDX;
    ballY += ballDY;
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
