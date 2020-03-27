import {Product} from './product';

export class Decoration extends Product {
    #color;
    #size;
    #packageCount;

    constructor(name, description, purchasePrice, minimalStock, currentStock, color, size, packageCount) {
        super(name, description, purchasePrice, minimalStock, currentStock);
        this.setColor(color);
        this.setSize(size);
        this.setPackageCount(packageCount);
    }

    getColor() {
        return this.#color;
    }

    setColor(value) {
        this.#color = value;
    }

    getSize() {
        return this.#size;
    }

    setSize(value) {
        this.checkNegativeValue(value);

        this.#size = value;
    }

    getPackageCount() {
        return this.#packageCount;
    }

    setPackageCount(value) {
        this.checkNegativeValue(value);

        this.#packageCount = value;
    }

    toString() {
        return `name: ${this.getName()}. description: ${this.getDescription()}. purchasePrice ${this.getPurchasePrice()}. 
        minimalStock: ${this.getMinimalStock()}. currentStock: ${this.getCurrentStock()}. color: ${this.getColor()}. 
        size: ${this.getSize()}. packageCount: ${this.getPackageCount()}.`;
    }

    toJSON() {
        return JSON.stringify({
            ...this._prepareForSave(),
            color: this.getColor(),
            size: this.getSize(),
            packageCount: this.getPackageCount(),
        });
    }

    static fromJSON(json) {
        const data = JSON.parse(json);

        const product = new this(data.name, data.description, data.purchasePrice,
            data.minimalStock, data.currentStock, data.color, data.size, data.packageCount);

        product.setImage(data.image);
        product.setComment(data.comment);
        product.setSignImage(data.signImage);

        data.customAttributes?.forEach(a => product.addCustomAttribute(a));

        return product;
    }
}