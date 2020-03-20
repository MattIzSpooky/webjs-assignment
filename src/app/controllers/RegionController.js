import {Region} from '../models/Region';
import {RegionView} from '../views/RegionView';

export class RegionController {
    #regionModel;
    #regionView;

    #obstructionCallback = (x, y) => y % 4 === 0 && x % 4 === 0;

    constructor() {
        this.#regionModel = new Region(this.#obstructionCallback);
        this.#regionView = new RegionView(Region.AMOUNT_OF_ROWS, this.#onSquareDrag, this.#onSquareDrop);
        this.#regionView.renderSquares(this.#regionModel.getSquares());
    }

    #onSquareDrag = (ev) => {
        ev.dataTransfer.setData('text', ev.target.id);
    };

    #onSquareDrop = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text');
        const $draggedElement = document.getElementById(data);

        const $draggedElementClone = $draggedElement.cloneNode(true);

        const $targetClone = ev.currentTarget.cloneNode(true);

        this.#regionView.bindEventHandlersToSquares($draggedElementClone, $targetClone);

        ev.currentTarget.replaceWith($draggedElementClone);
        $draggedElement.replaceWith($targetClone);

        const xDrag = +$draggedElementClone.dataset.x;
        const yDrag = +$draggedElementClone.dataset.y;

        const xTarget = +ev.currentTarget.dataset.x;
        const yTarget = +ev.currentTarget.dataset.y;

        const squares = this.#regionModel.getSquares();

        const squareDrag = squares.find(square => square.getX() === xDrag && square.getY() === yDrag);
        const squareTarget = squares.find(square => square.getX() === xTarget && square.getY() === yTarget);

        this.#regionModel.swapSquares(squareDrag, squareTarget);
    };
}