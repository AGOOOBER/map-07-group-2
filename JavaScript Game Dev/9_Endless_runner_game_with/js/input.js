export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            // if this key is pushed and it doesn't exist in the array add the key
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ' ')
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
                console.log(e.key, this.keys);
            }
        });
        window.addEventListener('keyup', e => {
            // if this key is realsed and it does exist in the array it is removed
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
                console.log(e.key, this.keys);
            }
        });
    }
}