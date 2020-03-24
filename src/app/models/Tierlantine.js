import {Product} from "./product";

export class Tierlantine extends Product {
    #weight;

    constructor(name, description, purchasePrice, minimalStock, currentStock, weight) {
        super(name, description, purchasePrice, minimalStock, currentStock);
        this.setWeight(weight);
    }

    getWeight() {
        return this.#weight;
    }

    setWeight(value) {
        this.checkNegativeValue(value);

        this.#weight = value;
    }

    toString() {
        return `name: ${this.getName()}. description: ${this.getDescription()}. purchasePrice ${this.getPurchasePrice()}. 
        minimalStock: ${this.getMinimalStock()}. currentStock: ${this.getCurrentStock()}. weight: ${this.getWeight()}.`;
    }

    toJSON() {
        return JSON.stringify({
            name: this.getName(),
            description: this.getDescription(),
            purchasePrice: this.getPurchasePrice(),
            minimalStock: this.getMinimalStock(),
            currentStock: this.getCurrentStock(),
            weight: this.getWeight(),
        });
    }

    static fromJSON(json) {
        const data = JSON.parse(json);

        return new this(data.name, data.description, data.purchasePrice,
            data.minimalStock, data.currentStock, data.weight);
    }
}