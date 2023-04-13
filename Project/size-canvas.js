// display
var nativeWidth = 16;
var nativeHeight = 9;
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');

function resizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = nativeWidth / nativeHeight;

    if (windowRatio < gameRatio) {
        canvas.width = windowWidth;
        canvas.height = windowWidth / gameRatio;
        collisionCanvas.width = windowWidth;
        collisionCanvas.height = windowWidth / gameRatio;
    } else {
        canvas.width = windowHeight * gameRatio;
        canvas.height = windowHeight;
        collisionCanvas.width = windowHeight * gameRatio;
        collisionCanvas.height = windowHeight;
    }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// game conditions
let score = 0;
let gameOver = false;
ctx.font = '50px Impact';

// time intervals
let timeToNextChicken = 0;
let enemyInterval = 500;
let lastTime = 0;

// ... (rest of your code remains unchanged)

function drawScore() {
    const scale = canvas.width / nativeWidth;
    ctx.font = 50 * scale + "px Impact";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 50 * scale, 75 * scale);
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 55 * scale, 80 * scale);
}

// ... (rest of your code remains unchanged)

function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    timeToNextChicken += deltaTime;
    if (timeToNextChicken > enemyInterval) {
        chickens.push(new Chicken());
        timeToNextChicken = 0;
        chickens.sort(function(a, b) {
            return a.width - b.width;
        })
    };
    // player score
    drawScore();
    // array literal spread operator
    [...particles, ...chickens, ...explosions].forEach(object => object.update(deltaTime));
    [...particles, ...chickens, ...explosions].forEach(object => object.draw());
    chickens = chickens.filter(raven => !raven.markedForDeletion);
    explosions = explosions.filter(explosion => !explosion.markedForDeletion);
    particles = particles.filter(particle => !particle.markedForDeletion);
    if (!gameOver) requestAnimationFrame(animate)
    else drawGameOver();
}
animate(0);

function startGame() {
    animate(0);
}

document.getElementById('startButton').addEventListener('click', () => {
    startGame();
    document.getElementById('startButton').style.display = 'none';
});

document.getElementById('restartButton').addEventListener('click', () => {
    location.reload();
});