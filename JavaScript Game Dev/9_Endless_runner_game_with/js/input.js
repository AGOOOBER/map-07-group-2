export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            // if this key is pushed and it doesn't exist in the array add the key
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter')
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } else if (e.key === 'd') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', e => {
            // if this key is realsed and it does exist in the array it is removed
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}