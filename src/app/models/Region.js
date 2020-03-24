import {Storable} from '../util/storable';
import {Square} from './Square';

export class Region extends Storable {
    #name;
    #squares = [];
    #unmanagedProducts = [];

    static AMOUNT_OF_ROWS = 15;

    getSquares() {
        return this.#squares.sort((a, b) => a.getX() - b.getX());
    }

    getUnmanagedProducts() {
        return this.#unmanagedProducts;
    }

    findUnmanagedProduct(name) {
        return this.#unmanagedProducts.find(p => p.getName() === name);
    }

    constructor(name, obstructionCallBack) {
        super();
        this.#name = name;
        this._recover(obstructionCallBack);
    }

    _generateSquares(obstructionCallBack) {
        for (let y = 1; y < Region.AMOUNT_OF_ROWS + 1; y++) {
            for (let x = 1; x < Region.AMOUNT_OF_ROWS + 1; x++) {
                const square = new Square(x, y, obstructionCallBack(x, y));

                if (!square.hasObstacle() && x === 1) {
                    square.message = 'test' + y; // TODO: remove
                }

                this.#squares.push(square);
            }
        }
    }

    /**
     * @param {Product} newProduct
     */
    addUnmanagedProduct(newProduct) {
        if (this.#unmanagedProducts.some(product => product.getName() === newProduct.getName())) {
            throw new Error('No duplicate entries.');
        }

        this.#unmanagedProducts.push(newProduct);
    }

    swapSquares(square1, square2) {
        // TODO: replace with actual data.
        const square1message = square1.message; // TODO: remove

        square1.message = square2.message;  // TODO: remove

        square2.message = square1message;  // TODO: remove

        this._persist();
    }

    placeProductOnSquare(product, square) {
        square.setProduct(product);

        console.log(this.#squares.find(s => s.getProduct() !== null));
        this._persist();
    }

    _persist() {
        localStorage.setItem(this.#name, JSON.stringify(this.#squares.map(square => square.toJSON())));
    }

    _recover(obstructionCallBack) {
        const rawSquares = localStorage.getItem(this.#name);

        if (rawSquares) {
            this.#squares = JSON.parse(rawSquares).map(rawSquare => Square.fromJSON(rawSquare));
        } else {
            this._generateSquares(obstructionCallBack);
        }
    }
}