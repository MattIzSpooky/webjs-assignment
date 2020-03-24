import {Controller} from '../Controller';

export class BaseRegionController extends Controller {
    constructor() {
        super();
        if (new.target === BaseRegionController) {
            throw new TypeError('Cannot construct BaseRegionController instances directly');
        }
    }

    onSquareDrag = (ev) => {
        ev.dataTransfer.setData('text', ev.target.id);
    };

    onSquareDrop = ({xDrag, yDrag}, {xTarget, yTarget}) => {
        const squares = this._model.getSquares();

        const squareDrag = this._findSquareByCoords(squares, xDrag, yDrag);
        const squareTarget = this._findSquareByCoords(squares, xTarget, yTarget);

        this._model.swapSquares(squareDrag, squareTarget);
    };

    onProductDrop = (productName, {xTarget, yTarget}) => {
        const squares = this._model.getSquares();
        const square = this._findSquareByCoords(squares, xTarget, yTarget);
        const product = this._model.findUnmanagedProduct(productName);

        this._model.placeProductOnSquare(product, square);
    };

    onSquareClick = (ev) => {
        ev.preventDefault();

        const squares = this._model.getSquares();

        const x = +ev.currentTarget.dataset.x;
        const y = +ev.currentTarget.dataset.y;
        const square = this._findSquareByCoords(squares, x, y);

        console.log(square.toString());
    };

    _findSquareByCoords(squares, x, y) {
        return squares.find(square => square.getX() === x && square.getY() === y)
    }

    renderView() {
        this._view.renderSquares(this._model.getSquares());
    }
}