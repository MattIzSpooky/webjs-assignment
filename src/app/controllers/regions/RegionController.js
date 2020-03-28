import {Controller} from '../Controller';
import {ProductDetailController} from '../ProductDetailController';
import {Region} from '../../models/Region';
import {RegionView} from '../../views/RegionView';
import {UnmanagedProductController} from '../UnmanagedProductController';

export class RegionController extends Controller {
    /**
     * @type UnmanagedProductController
     */
    #unmanagedProductController;

    /**
     * @param {Region} region
     */
    constructor(region) {
        super();
        this._model = region;
        this._view = new RegionView(Region.AMOUNT_OF_ROWS, this.#onSquareDrag, this.#onSquareDrop, this.#onSquareClick, this.#onProductDrop);

        this._renderView();

        this.#unmanagedProductController = new UnmanagedProductController(this._model);

        this._view.attachView(this.#unmanagedProductController.getView());
    }

    /**
     * @param {DragEvent} ev
     */
    #onSquareDrag = (ev) => {
        ev.dataTransfer.setData('text', ev.target.id);
    };

    /**
     * @param {Number} xDrag
     * @param {Number} yDrag
     * @param {Number} xTarget
     * @param {Number} yTarget
     */
    #onSquareDrop = ({xDrag, yDrag}, {xTarget, yTarget}) => {
        const squares = this._model.getSquares();

        const squareDrag = this._findSquareByCoords(squares, xDrag, yDrag);
        const squareTarget = this._findSquareByCoords(squares, xTarget, yTarget);

        this._model.swapSquares(squareDrag, squareTarget);
    };

    /**
     * @param {String} productName
     * @param {Number} xTarget
     * @param {Number} yTarget
     */
    #onProductDrop = (productName, {xTarget, yTarget}) => {
        const squares = this._model.getSquares();
        const square = this._findSquareByCoords(squares, xTarget, yTarget);
        const product = this._model.findUnmanagedProduct(productName);

        this._model.placeProductOnSquare(product, square);

        this.#unmanagedProductController.rerenderDropdown();
    };

    /**
     * @param {Event} ev
     */
    #onSquareClick = (ev) => {
        ev.preventDefault();

        const squares = this._model.getSquares();

        const {x, y} = ev.currentTarget.dataset;

        const square = this._findSquareByCoords(squares, +x, +y);

        const product = square.getProduct();

        if (product) {
            new ProductDetailController(this._model, product, () => {
                this._view.updateSquare(square)
            });
        }
    };

    /**
     * @param {Square[]} squares
     * @param {Number} x
     * @param {Number} y
     * @returns {*}
     * @private
     */
    _findSquareByCoords(squares, x, y) {
        return squares.find(square => square.getX() === x && square.getY() === y);
    }

    /**
     * @private
     */
    _renderView() {
        this._view.renderSquares(this._model.getSquares());
    }
}
