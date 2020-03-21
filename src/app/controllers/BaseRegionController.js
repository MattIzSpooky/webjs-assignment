import {Region} from '../models/Region';
import {RegionView} from '../views/RegionView';

export class BaseRegionController {
    _regionModel;
    _regionView;

    constructor(regionModel) {
        if (new.target === BaseRegionController) {
            throw new TypeError('Cannot construct BaseRegionController instances directly');
        }

        this._regionModel = regionModel;
        this._regionView = new RegionView(Region.AMOUNT_OF_ROWS, this._onSquareDrag, this._onSquareDrop, this._onSquareClick);
        this._regionView.renderSquares(this._regionModel.getSquares());
    }

    _onSquareDrag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
    }

    _onSquareDrop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text');
        const $draggedElement = document.getElementById(data);

        const $draggedElementClone = $draggedElement.cloneNode(true);

        const $targetClone = ev.currentTarget.cloneNode(true);

        this._regionView.bindEventHandlersToSquares($draggedElementClone, $targetClone);

        ev.currentTarget.replaceWith($draggedElementClone);
        $draggedElement.replaceWith($targetClone);

        const xDrag = +$draggedElementClone.dataset.x;
        const yDrag = +$draggedElementClone.dataset.y;

        const xTarget = +ev.currentTarget.dataset.x;
        const yTarget = +ev.currentTarget.dataset.y;

        const squares = this._regionModel.getSquares();

        const squareDrag = this._findSquareByCoords(squares, xDrag, yDrag);
        const squareTarget = this._findSquareByCoords(squares, xTarget, yTarget);

        this._regionModel.swapSquares(squareDrag, squareTarget);
    }

    _onSquareClick(ev) {
        ev.preventDefault();

        const squares = this._regionModel.getSquares();

        const x = +ev.currentTarget.dataset.x;
        const y = +ev.currentTarget.dataset.y;
        const square = this._findSquareByCoords(squares, x, y);

        console.log(square.toString());
    }

    _findSquareByCoords(squares, x, y) {
        return squares.find(square => square.getX() === x && square.getY() === y)
    }

    destroy() {
        this._regionModel = null;
        this._regionView.destroyView();
    }
}