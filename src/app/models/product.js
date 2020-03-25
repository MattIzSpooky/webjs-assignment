/**
 * An abstract class
 */
export class Product {
    #name;
    #description;
    #purchasePrice;
    #minimalStock;
    #currentStock;
    #image;

    #customAttributes = [];

    constructor(name, description, purchasePrice, minimalStock, currentStock) {
        if (new.target === Product) {
            throw new TypeError('Cannot construct Product instances directly');
        }

        this.setName(name);
        this.setDescription(description);
        this.setPurchasePrice(purchasePrice);
        this.setMinimalStock(minimalStock);
        this.setCurrentStock(currentStock);
    }

    /**
     * @param {CustomAttribute} attribute
     */
    addCustomAttribute(attribute) {
        if (this.#customAttributes.some(c => c.getName() === attribute.getName())) {
            throw new Error(`Duplicate attribute: ${attribute.getName()}`)
        }

        this.#customAttributes.push(attribute);
    }

    getCustomAttributes() {
        return this.#customAttributes;
    }

    setImage(image) {
        this.#image = image;
    }

    getImage() {
        return this.#image;
    }

    getName() {
        return this.#name;
    }

    setName(value) {
        this.#name = value;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(value) {
        this.#description = value;
    }

    getPurchasePrice() {
        return this.#purchasePrice;
    }

    setPurchasePrice(value) {
        this.checkNegativeValue(value);

        this.#purchasePrice = value;
    }

    getMinimalStock() {
        return this.#minimalStock;
    }

    setMinimalStock(value) {
        this.checkNegativeValue(value);

        this.#minimalStock = value;
    }

    getCurrentStock() {
        return this.#currentStock;
    }

    setCurrentStock(value) {
        this.checkNegativeValue(value);

        this.#currentStock = value;
    }

    checkNegativeValue(value) {
        if (value < 0) {
            throw new RangeError('Cannot set a nagative value');
        }
    }

    toJSON() {
        throw new Error('Method toJSON() must be implemented.');
    }

    static fromJSON() {
        throw new Error('Method fromJSON() must be implemented.');
    }
}

export class CustomAttribute {
    #name;
    #value;

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    setValue(value) {
        this.#value = value;
    }

    getValue() {
        return this.#value;
    }

    constructor(name, value) {
        this.#name = name;
        this.#value = value;
    }
}