import {BaseView} from './BaseView';

export class RegionView extends BaseView {
    #$rows = [];
    #rowAmount;

    #onDragHandler;
    #onDropHandler;
    #onClickHandler;

    constructor(rowAmount, onDragHandler, onDropHandler, onClickHandler) {
        super();
        this.#rowAmount = rowAmount;
        this.#onDragHandler = onDragHandler;
        this.#onDropHandler = onDropHandler;
        this.#onClickHandler = onClickHandler;

        const app = this.getElement('#app');

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
            $square.ondragstart = (ev) => this.#onDragHandler(ev);
            $square.ondrop = this.#dropHandler;
            $square.onclick = this.#onClickHandler;
            $square.ondragover = (ev) => ev.preventDefault();
        }
    }

    #dropHandler = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text');
        const $draggedElement = document.getElementById(data);

        const $draggedElementClone = $draggedElement.cloneNode(true);
        const $targetClone = ev.currentTarget.cloneNode(true);

        this.bindEventHandlersToSquares($draggedElementClone, $targetClone);

        const xDrag = +$draggedElementClone.dataset.x;
        const yDrag = +$draggedElementClone.dataset.y;

        const xTarget = +ev.currentTarget.dataset.x;
        const yTarget = +ev.currentTarget.dataset.y;

        this.#onDropHandler({xDrag, yDrag}, {xTarget, yTarget});

        Object.assign($draggedElementClone.dataset, ev.currentTarget.dataset);
        Object.assign($targetClone.dataset, $draggedElement.dataset);
        $draggedElementClone.id = ev.currentTarget.id;
        $targetClone.id = $draggedElement.id;

        ev.currentTarget.replaceWith($draggedElementClone);
        $draggedElement.replaceWith($targetClone);
    };


}