import {Product} from './product';

export class Tierlantine extends Product {
    #weight;

    constructor(name, description, purchasePrice, minimalStock, currentStock, profitMargin, weight) {
        super(name, description, purchasePrice, minimalStock, currentStock, profitMargin);
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

    toSaveable() {
        return {
            ...this._prepareForSave(),
            weight: +this.getWeight(),
        }
    }

    static fromSaveable(data) {
        const product = new this(data.name, data.description, data.purchasePrice,
            data.minimalStock, data.currentStock, data.profitMargin, data.weight);

        product.setImage(data.image);
        product.setComment(data.comment);
        product.setSignImage(data.signImage);

        data.customAttributes?.forEach(a => product.addCustomAttribute(a));

        return product;
    }
}