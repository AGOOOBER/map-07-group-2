// load > DOMContentLoaded because DOMContentLoaded only works on a local system
// loaded is not working 
// TODO: check why it is not working
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 700;

    class Game {
        constructor(ctx, width, height) {
            // the context is being used as a property 
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 500;
            this.enemyTimer = 0;
            this.enemyTypes = ['worm', 'ghost', 'spider']
        }

        // Delta time is being used for periodic change
        update(deltaTime) {
            if (this.enemyTimer > this.enemyInterval) {
                this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
                this.#addnewEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => enemy.update(deltaTime));
        }

        draw() {
            this.enemies.forEach(enemy => enemy.draw(this.ctx));
        }
        // '#' at the begining of a method means it's private
        #addnewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if (randomEnemy == 'worm') this.enemies.push(new Worm(this));
            else if (randomEnemy == 'ghost') this.enemies.push(new Ghost(this));
            else if (randomEnemy == 'spider') this.enemies.push(new Spider(this));
            // this.enemies.sort(function(a,b){
            //     return a.y - b.y;
            // });
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.markedForDeletion = false;
            this.frameX = 0;
            this.maxFrame = 5;
            this.frameInterval = 100;
            this.frameTimer = 0;
        }

        update(deltaTime) {
            this.x -= this.velocityX * deltaTime;
            if (this.x < 0 - this.width) this.markedForDeletion = true;
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            // this needs to be up top using it's parent constructor
            super(game);
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5; 
            this.x = this.game.width;
            this.y = this.game.height - this.height;
            this.image = worm;
            this.velocityX = Math.random() * 0.1 + 0.1;
        }
    }

    class Ghost extends Enemy {
        constructor(game) {
            // this needs to be up top using it's parent constructor
            super(game);
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5; 
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.6;
            this.image = ghost;
            this.velocityX = Math.random() * 0.2 + 0.1;
            this.angle = 0;
        }
        update(deltaTime) {
            super.update(deltaTime);
            this.y += Math.sin(this.angle) * 1;
            this.angle += 0.02;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = 0.7;
            super.draw(ctx);
            ctx.restore();
        }
    }

    class Spider extends Enemy {
        constructor(game) {
            // this needs to be up top using it's parent constructor
            super(game);
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5; 
            this.x = Math.random() * this.game.width;
            this.y = 0 - this.height;
            this.image = spider;
            this.velocityX = 0;
            this.velocityY = Math.random() * 0.1 + 0.1;
            this.maxLength = Math.random() * this.game.height;
        }

        update(deltaTime) {
            super.update(deltaTime);
            if (this.y < 0 - this.height * 2) this.markedForDeletion = true;
            this.y += this.velocityY * deltaTime;
            if (this.y > this.maxLength) this. velocityY *=  -1;
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.width * 0.5, 0);
            ctx.lineTo(this.x + this.width * 0.5, this.y  + 10);
            ctx.stroke();
            super.draw(ctx);

        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    // By counting the time by using requestAnimationFrame passing automatically a time stamp
    let lastTime = 1;
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        // some code
        requestAnimationFrame(animate);
    }

    animate(0);
})