export default class InputHandler {
    constructor() {
        this.lastKey = '';
        /* ES6 arrow functions
            # They do not bind thier own 'this', but they inherit the one
            from their parent scope, this is called 'lexical scoping' 
            # This allows us to retain the scope of the caller inside
                the function, so we don't need to use 'bind'*/
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.lastKey = 'PRESS left';
                    break;
                case "ArrowRight":
                    this.lastKey = "PRESS right";
                    break;
                case "ArrowDown":
                    this.lastKey = "PRESS down";
                    break;
                case "ArrowUp":
                    this.lastKey = "PRESS up";
                    break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.lastKey = 'RELEASE left';
                    break;
                case "ArrowRight":
                    this.lastKey = 'RELEASE right';
                    break;
                case "ArrowDown":
                    this.lastKey = 'RELEASE down';
                    break;
                case "ArrowUp":
                    this.lastKey = 'RELEASE up';
                    break;
            }
        });
    }
}