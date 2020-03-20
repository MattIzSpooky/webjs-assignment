import {BaseView} from './BaseView';

export class RegionView extends BaseView {
    #$rows = [];
    #rowAmount;

    #onDragHandler;
    #onDropHandler;

    constructor(rowAmount, onDragHandler, onDropHandler) {
        super();
        this.#rowAmount = rowAmount;
        this.#onDragHandler = onDragHandler;
        this.#onDropHandler = onDropHandler;

        const app = this.getElement('#app');
        this.$root = this.createElement('div');
        for (let i = 0; i < rowAmount; i++) {
            this.#$rows.push(this.createRow());
        }

        this.$root.append(...this.#$rows);
        app.append(this.$root);
    }

    renderSquares(squares) {
        let rowCount = 0;

        for (const square of squares) {
            const $square = this.createElement('div');
            $square.textContent = square.message; // TODO: remove
            $square.classList.add('square');

            if (square.hasObstacle()) {
                $square.classList.add('square-obstruction');
            } else {
                this.bindEventHandlersToSquares($square);
            }
            $square.dataset.x = square.getX();
            $square.dataset.y = square.getY();
            $square.id = `${square.getX()}-${square.getY()}`;

            this.#$rows[rowCount].appendChild($square);

            if (square.getY() % this.#rowAmount === 0) {
                rowCount++;
            }
        }
    }

    bindEventHandlersToSquares(...$squares) {
        for (const $square of $squares) {
            $square.draggable = true;
            $square.ondragstart = this.#onDragHandler;
            $square.ondrop = this.#onDropHandler;
            $square.ondragover = (ev) => ev.preventDefault();
        }
    }
}