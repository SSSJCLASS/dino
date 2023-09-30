const readline = require('readline');
const { stdin, stdout } = require('process');
const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

const dino = '🦕';
const ground = '_';
const obstacle = '🌵';

let dinoPosition = 0;
let isJumping = false;
let gameSpeed = 200;
let score = 0;

function drawGame() {
    const gameWidth = 30;

    let gameLine = '';
    for (let i = 0; i < gameWidth; i++) {
    if (i === dinoPosition) {
        gameLine += dino;
    } else if (i < dinoPosition || i > dinoPosition + 1) {
        gameLine += ground;
    } else {
        gameLine += ' ';
    }
    }

    console.clear();
    console.log(`Счет: ${score}`);
    console.log(gameLine);
    console.log(obstacle);


    if (isJumping) {
    jump();
    } else {
    rl.question('Нажмите пробел, чтобы прыгнуть...', (answer) => {
        if (answer === ' ') {
        jump();
        }
    });
    }
}

function jump() {
    if (!isJumping) {
    isJumping = true;
    setTimeout(() => {
        isJumping = false;
    }, 500);
    }
}

function generateObstacle() {
    const gameWidth = 30;
    const obstacleWidth = 4;
    const gapWidth = 6;
    const obstacleLine = Array(gameWidth).fill(ground);
  const obstaclePosition = Math.floor(Math.random() * (gameWidth - obstacleWidth - gapWidth));

    for (let i = obstaclePosition; i < obstaclePosition + obstacleWidth; i++) {
    obstacleLine[i] = obstacle;
    }

    return obstacleLine.join('');
}

function updateGame() {
    score++;

    if (score % 10 === 0) {
    if (gameSpeed > 50) {
        gameSpeed -= 10;
    }
    }

    const obstacleLine = generateObstacle();

    if (obstacleLine[dinoPosition] === obstacle || obstacleLine[dinoPosition + 1] === obstacle) {
    console.clear();
    console.log(`Игра окончена! Ваш счет: ${score}`);
    process.exit(0);
    }

    drawGame();
    setTimeout(updateGame, gameSpeed);
}
updateGame()