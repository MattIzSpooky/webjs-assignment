/**
 * An abstract class
 */
export class Product {
    #name;
    #description;
    #purchasePrice;
    #minimalStock;
    #currentStock;

    constructor(name, description, purchasePrice, minimalStock, currentStock) {
        if (new.target === Product) {
            throw new TypeError("Cannot construct Product instances directly");
        }

        this.setName(name);
        this.setDescription(description);
        this.setPurchasePrice(purchasePrice);
        this.setMinimalStock(minimalStock);
        this.setCurrentStock(currentStock);
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
            throw new RangeError("Cannot set a nagative value");
        }
    }
}