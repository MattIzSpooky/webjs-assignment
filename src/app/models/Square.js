export class Square {
    #x;
    #y;
    #hasObstacle;

    hasObstacle() {
        return this.#hasObstacle;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    // TODO: remove this temp thingy.
    // TODO: remove all references in code to message later down the line.
    // This is just to test persisting and swapping squares.
    message;

    constructor(x, y, hasObstacle = false) {
        this.#x = x;
        this.#y = y;
        this.#hasObstacle = hasObstacle;
    }

    toString() {
        return `x: ${this.#x}. y: ${this.#y}. hasObstacle: ${this.hasObstacle()}. message: ${this.message}`;  // TODO: remove message
    }

    toJSON() {
        return JSON.stringify({
            x: this.getX(),
            y: this.getY(),
            hasObstacle: this.hasObstacle(),
            message: this.message // TODO: remove message
        });
    }

    static fromJSON(json) {
        const data = JSON.parse(json);

        const square = new this(data.x, data.y, data.hasObstacle);
        square.message = data.message; // TODO: remove message

        return square;
    }
}