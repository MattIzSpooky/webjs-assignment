import {Storable} from '../util/storable';
import {Square} from './Square';
import {ProductFactory} from '../util/product-factory';

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
                this.#squares.push(new Square(x, y, obstructionCallBack(x, y)));
            }
        }

        this.save();
    }

    swapSquares(square1, square2) {
        const square1Product = square1.getProduct();
        square1.setProduct(square2.getProduct());
        square2.setProduct(square1Product);

        this.save();
    }

    placeProductOnSquare(product, square) {
        this.#unmanagedProducts
            .splice(this.#unmanagedProducts
                .indexOf(this.#unmanagedProducts
                    .find(p => p.getName() === product.getName())), 1);

        square.setProduct(product);

        this.save();
    }

    save() {
        localStorage.setItem(`${this.#name}-squares`, JSON.stringify(this.#squares.map(square => square.toSaveable())));

        const products = this.#squares
            .filter(square => !!square.getProduct())
            .map(square => {
                const product = square.getProduct();

                return {
                    x: square.getX(),
                    y: square.getY(),
                    product: product.toSaveable()
                }
            });

        localStorage.setItem(`${this.#name}-square-products`, JSON.stringify(products));
        localStorage.setItem(`${this.#name}-unmanaged`, JSON.stringify(this.#unmanagedProducts.map(product => product.toSaveable())));
    }

    _recover(obstructionCallBack) {
        const rawSquares = localStorage.getItem(`${this.#name}-squares`);
        const rawUnmanagedProducts = localStorage.getItem(`${this.#name}-unmanaged`);
        const rawSquareProducts = localStorage.getItem(`${this.#name}-square-products`);
        const productFactory = new ProductFactory();

        if (rawUnmanagedProducts) {
            this.#unmanagedProducts = JSON.parse(rawUnmanagedProducts).map(rawProduct => productFactory.fromSaveable(rawProduct));
        }

        if (rawSquares) {
            this.#squares = JSON.parse(rawSquares).map(rawSquare => Square.fromSaveable(rawSquare));
        } else {
            this._generateSquares(obstructionCallBack);
        }

        if (rawSquareProducts) {
            const squareProducts = JSON.parse(rawSquareProducts);

            this.#squares.forEach(square => {
                const squareProduct = squareProducts.find(sp => sp.x === square.getX() && sp.y === square.getY());

                if (squareProduct) {
                    square.setProduct(productFactory.fromSaveable(squareProduct.product));
                }
            })
        }
    }
}