import {Product} from './product';

export class Clothes extends Product {
    #color;
    #size;

    constructor(name, description, purchasePrice, minimalStock, currentStock, color, size) {
        super(name, description, purchasePrice, minimalStock, currentStock);
        this.setColor(color);
        this.setSize(size);
    }

    getColor() {
        return this.#color;
    }

    setColor(value) {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
            throw new Error(`Invalid color: ${value}`);
        }

        this.#color = value;
    }

    getSize() {
        return this.#size;
    }

    setSize(value) {
        this.checkNegativeValue(value);

        this.#size = value;
    }

    toString() {
        return `name: ${this.getName()}.\n
        description: ${this.getDescription()}.\n
        purchasePrice ${this.getPurchasePrice()}.\n
        minimalStock: ${this.getMinimalStock()}.\n
        currentStock: ${this.getCurrentStock()}.\n
        color: ${this.getColor()}.\n
        size: ${this.getSize()}.
        image: ${this.getImage()}
        `;
    }

    toJSON() {
        return JSON.stringify({
            type: this.constructor.name,
            name: this.getName(),
            description: this.getDescription(),
            purchasePrice: this.getPurchasePrice(),
            minimalStock: this.getMinimalStock(),
            currentStock: this.getCurrentStock(),
            color: this.getColor(),
            size: this.getSize(),
            image: this.getImage()
        });
    }

    static fromJSON(json) {
        const data = JSON.parse(json);

        const product = new this(data.name, data.description, data.purchasePrice,
            data.minimalStock, data.currentStock, data.color, data.size);

        product.setImage(data.image);

        return product;
    }
}