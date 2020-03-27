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


    _persist() {
        const regionName = this.getType().toLowerCase();
        const squareProducts = JSON.parse(localStorage.getItem(`${regionName}-square-products`));

        const sqIndex = squareProducts.findIndex(sq => sq.product.type === this.getType() && sq.product.name === this.getName());
        squareProducts[sqIndex].product = this.toSaveable();

        localStorage.setItem(`${regionName}-square-products`, JSON.stringify(squareProducts));
    }

    saveUnmanaged() {
        const regionName = this.getType().toLowerCase();
        const unmanaged = JSON.parse(localStorage.getItem(`${regionName}-unmanaged`)) || [];

        const sqIndex = unmanaged.findIndex(un => un.name === this.getName());

        if (sqIndex === -1) {
            unmanaged.push(this.toSaveable());
        } else {
            unmanaged[sqIndex] = this.toSaveable();
        }

        localStorage.setItem(`${regionName}-unmanaged`, JSON.stringify(unmanaged));
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

    toSaveable() {
        throw new Error('Method toSaveable() must be implemented.');
    }

    static fromSaveable() {
        throw new Error('Method fromSaveable() must be implemented.');
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