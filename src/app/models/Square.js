export class Square {
    #x;
    #y;
    #hasObstacle;
    #product;

    hasObstacle() {
        return this.#hasObstacle;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getProduct() {
        return this.#product;
    }

    setProduct(product) {
        this.#product = product;
    }

    constructor(x, y, hasObstacle = false) {
        this.#x = x;
        this.#y = y;
        this.#hasObstacle = hasObstacle;
    }

    toString() {
        return `
        x: ${this.#x}. 
        y: ${this.#y}. 
        hasObstacle: ${this.#hasObstacle}.
        product: ${this.#product ? this.#product.toString() : undefined} 
        `;
    }

    toSaveable() {
        return {
            x: this.#x,
            y: this.#y,
            hasObstacle: this.#hasObstacle
        }
    }

    static fromSaveable(data) {
        return new this(data.x, data.y, data.hasObstacle);
    }

    toJSON() {
        return JSON.stringify({
            x: this.getX(),
            y: this.getY(),
            hasObstacle: this.hasObstacle()
        });
    }

    static fromJSON(json) {
        const data = JSON.parse(json);
        return new this(data.x, data.y, data.hasObstacle);
    }
}