// load > DOMContentLoaded because DOMContentLoaded only works on a local system
// loaded is not working 
// TODO: check why it is not working
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;

    class Game {
        constructor(ctx, width, height) {
            // the context is being used as a property 
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
        }

        // Delta time is being used for periodic change
        update(deltaTime) {
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval) {
                this.#addnewEnemy();
                this.enemyTimer = 0;
                console.log(this.enemies);
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => enemy.update());
        }

        draw() {
            this.enemies.forEach(enemy => enemy.draw(this.ctx));
        }
        // '#' at the begining of a method means it's private
        #addnewEnemy() {
            this.enemies.push(new Worm(this));
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.markedForDeletion = false;
        }

        update() {
            this.x--;
            if (this.x < 0 - this.width) this.markedForDeletion = true;
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy {
        constructor() {
            // this needs to be up top using it's parent constructor
            super(game);
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = 200;
            this.height = 100;
            this.image = worm;
            console.log(this.image);
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