// display
// the resolution the game is desinged to look best in
var nativeWidth = 800;
var nativeHeight = 600;
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = nativeWidth;
canvas.height = nativeHeight;
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = nativeWidth;
collisionCanvas.height = nativeHeight;


// game conditions
let score = 0;
let gameOver = false;
ctx.font = '50px Impact';

// time intervals
let timeToNextChicken = 0;
let enemyInterval = 500;
let lastTime = 0;

// Objects (Enemies, Explosion, Particles)

let chickens = [];
class Chicken {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 3 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'asset/game/chicken.png';
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColor[0] + ',' + this.randomColor[1] + ',' + this.randomColor[2] + ')';
        this.hasTrail = Math.random() > 0.5;
    }

    // this counts the delta time the time in milliseconds between last frame and current frame
    // this consistent 
    update(deltaTime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
            if (this.hasTrail) {
                for (let i = 0; i < 1; i++) {
                    particles.push(new Particle(this.x, this.y, this.width));
                }
            }
        }
        // end game condition (if ravens cross screen)
        if (this.x < 0 - this.width) gameOver = true;
    }

    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let explosions = [];
class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = 'asset/game/boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'asset/game/boom.wav'
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }
        if (this.frame > 5) this.markedForDeletion = true;
    }

    draw() {
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        // s = source crop out from image d = distanation 
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth,
            this.spriteHeight, this.x, this.y - this.size * 0.3, this.size, this.size);
    }
}

let particles = [];
class Particle {
    constructor(x, y, size) {
        this.size = size;
        this.x = x + this.size * 0.5 + Math.random() * 50 - 25;
        this.y = y + this.size * 0.3 + Math.random() * 50 - 25;
        this.radius = Math.random() * this.size / 10;
        this.maxRadius = Math.random() * 20 + 35;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = 'rgb(255, 255, 255)';
    }
    update() {
        this.x += this.speedX;
        this.radius += 0.5;
        // this removes the particles a shorter range
        if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
    }

    draw() {
        ctx.save();
        // this will slowly make the particles disappear with when radius is equal to maxRadius
        ctx.globalAlpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'black';
    ctx.fillText('Score:' + score, 55, 80);
}

function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER, Score: ' + score, canvas.width * 0.5, canvas.height * 0.5);
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER, Score: ' + score, canvas.width * 0.5 + 5, canvas.height * 0.5 + 5);
}

window.addEventListener('click', function(e) {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    // console.log(detectPixelColor);
    const pc = detectPixelColor.data;
    chickens.forEach(chicken => {
        if (chicken.randomColor[0] === pc[0] && chicken.randomColor[1] === pc[1] && chicken.randomColor[2] === pc[2]) {
            // colision detected
            chicken.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(chicken.x, chicken.y, chicken.width));
        }
    })
})

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
    if (!gameOver) {
        requestAnimationFrame(animate);
    } else {
        drawGameOver();
        if (currentUser) {
            currentUser.score = score;
            currentUser.scoreHistory.push(score);
            console.log(users) // Update the currentUser's score
        }
    }
}
//animate(0);

function startGame() {
    animate(0);
}

document.getElementById('startButton').addEventListener('click', () => {
    startGame();
    document.getElementById('startButton').style.display = 'none';
});

function resetGame() {
    score = 0;
    gameOver = false;
    timeToNextChicken = 0;
    lastTime = 0;
    chickens = [];
    explosions = [];
    particles = [];
    document.getElementById('restartButton').style.display = 'none';
}

function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER, Score: ' + score, canvas.width * 0.5, canvas.height * 0.5);
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER, Score: ' + score, canvas.width * 0.5 + 5, canvas.height * 0.5 + 5);
    document.getElementById('restartButton').style.display = 'block';
}

document.getElementById('restartButton').addEventListener('click', () => {
    resetGame();
    startGame();
});