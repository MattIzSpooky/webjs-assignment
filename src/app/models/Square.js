import {ProductFactory} from '../util/product-factory';

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

    toJSON() {
        return JSON.stringify({
            x: this.getX(),
            y: this.getY(),
            hasObstacle: this.hasObstacle(),
            product: this.#product ? this.#product.toJSON() : undefined
        });
    }

    static fromJSON(json) {
        const data = JSON.parse(json);

        const square = new this(data.x, data.y, data.hasObstacle);

        if (data.product) {
            square.setProduct(new ProductFactory().fromJSON(data.product));
        }

        return square;
    }
}