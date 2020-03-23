export class BaseRegionController {
    _regionModel;
    _regionView;

    constructor() {
        if (new.target === BaseRegionController) {
            throw new TypeError('Cannot construct BaseRegionController instances directly');
        }
    }

    onSquareDrag = (ev) => {
        ev.dataTransfer.setData('text', ev.target.id);
    };

    onSquareDrop = ({xDrag, yDrag}, {xTarget, yTarget}) => {
        const squares = this._regionModel.getSquares();

        const squareDrag = this._findSquareByCoords(squares, xDrag, yDrag);
        const squareTarget = this._findSquareByCoords(squares, xTarget, yTarget);

        this._regionModel.swapSquares(squareDrag, squareTarget);
    };

    onSquareClick = (ev) => {
        ev.preventDefault();

        const squares = this._regionModel.getSquares();

        const x = +ev.currentTarget.dataset.x;
        const y = +ev.currentTarget.dataset.y;
        const square = this._findSquareByCoords(squares, x, y);

        console.log(square.toString());
    };

    _findSquareByCoords(squares, x, y) {
        return squares.find(square => square.getX() === x && square.getY() === y)
    }

    renderView() {
        this._regionView.renderSquares(this._regionModel.getSquares());
    }

    destroy() {
        this._regionModel = null;
        this._regionView.destroy();
    }
}