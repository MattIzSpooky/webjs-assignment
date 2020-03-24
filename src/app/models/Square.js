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

    // TODO: remove this temp thingy.
    // TODO: remove all references in code to message later down the line.
    // This is just to test persisting and swapping squares.
    message;

    constructor(x, y, hasObstacle = false) {
        this.#x = x;
        this.#y = y;
        this.#hasObstacle = hasObstacle;
    }

    // TODO: remove message
    toString() {
        return `
        x: ${this.#x}. 
        y: ${this.#y}. 
        hasObstacle: ${this.hasObstacle}. 
        message: ${this.message}
        product: ${this.#product.toString()} 
        `;
    }

    toJSON() {
        return JSON.stringify({
            x: this.getX(),
            y: this.getY(),
            hasObstacle: this.hasObstacle(),
            message: this.message, // TODO: remove message
            product: this.#product ? this.#product.toJSON() : undefined
        });
    }

    static fromJSON(json) {
        const data = JSON.parse(json);

        const square = new this(data.x, data.y, data.hasObstacle);
        square.message = data.message; // TODO: remove message

        // if (data.product) {
        //     console.log(data.product);
        //     console.log(Product.fromJSON(data.product));
        //     square.setProduct(JSON.parse(data.product)); // TODO: check if this causes issues.
        //     console.log(square.getProduct());
        // }

        return square;
    }
}