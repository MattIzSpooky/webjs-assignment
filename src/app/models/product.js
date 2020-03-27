/**
 * An abstract class
 */
import {Storable} from '../util/storable';

export class Product extends Storable {
    #name;
    #description;
    #purchasePrice;
    #minimalStock;
    #currentStock;
    #image;

    #customAttributes = [];
    #comment;
    #signImg;

    constructor(name, description, purchasePrice, minimalStock, currentStock) {
        super();
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
        if (this.#customAttributes.some(c => c.name === attribute.name)) {
            throw new Error(`Duplicate attribute: ${attribute.name}`)
        }

        this.#customAttributes.push(attribute);
    }

    clearCustomAttributes() {
        this.#customAttributes = [];
    }

    getCustomAttributes() {
        return this.#customAttributes;
    }

    getSignImage() {
        return this.#signImg;
    }

    setSignImage(img) {
        this.#signImg = img;
    }

    setComment(comment) {
        this.#comment = comment;
    }

    getComment() {
        return this.#comment;
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

    getType() {
        return this.constructor.name;
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

    _persist() {
        const regionName = this.getType().toLowerCase();
        const squareProducts = JSON.parse(localStorage.getItem(`${regionName}-square-products`));

        const sqIndex = squareProducts.findIndex(sq => sq.type === this.getType() && sq.productName === this.getName());
        squareProducts[sqIndex].product = this.toJSON();

        localStorage.setItem(`${regionName}-square-products`, JSON.stringify(squareProducts));
    }

    saveUnmanaged() {
        const regionName = this.getType().toLowerCase();
        const unmanaged = JSON.parse(localStorage.getItem(`${regionName}-unmanaged`)).map(i => JSON.parse(i));

        const sqIndex = unmanaged.findIndex(un => un.name === this.getName());

        if (sqIndex === -1) {
            unmanaged.push(this);
        } else {
            unmanaged[sqIndex] = this.toJSON();
        }

        localStorage.setItem(`${regionName}-unmanaged`, JSON.stringify(unmanaged.map(product => JSON.stringify(product))));
    }

    _prepareForSave() {
        return {
            type: this.constructor.name,
            name: this.getName(),
            description: this.getDescription(),
            purchasePrice: this.getPurchasePrice(),
            minimalStock: this.getMinimalStock(),
            currentStock: this.getCurrentStock(),
            image: this.getImage(),
            customAttributes: this.getCustomAttributes(),
            comment: this.getComment(),
            signImage: this.getSignImage()
        }
    }
}


// struct
export class CustomAttribute {
    name;
    value;

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}