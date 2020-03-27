import {BaseView} from './BaseView';
import {ColumnBuilder} from '../util/column';

export class RegionView extends BaseView {
    #$rows = [];
    #rowAmount;

    #onDragHandler;
    #onSquareDropHandler;
    #onClickHandler;
    #onProductDropHandler;


    constructor(rowAmount, onDragHandler, onSquareDropHandler, onClickHandler, onProductDropHandler) {
        super();
        this.#rowAmount = rowAmount;
        this.#onDragHandler = onDragHandler;
        this.#onSquareDropHandler = onSquareDropHandler;
        this.#onClickHandler = onClickHandler;
        this.#onProductDropHandler = onProductDropHandler;

        const app = this.getElement('#app');

        for (let i = 0; i < rowAmount; i++) {
            this.#$rows.push(this.createRow());
        }

        const $row = this.createRow();

        const colBuilder = new ColumnBuilder()
            .addType('md');

        const $regionColumn = this.createColumn(colBuilder.addWidth(8).getResult());
        $regionColumn.append(...this.#$rows);

        const $productsColumn = this.createColumn(colBuilder.addWidth(3).getResult());

        $row.append($regionColumn, $productsColumn);

        this.$root.append($row);
        app.append(this.$root);
    }

    attachView(view) {
        const $attachable = this.$root.querySelector('.col-md-3');

        $attachable.append(view);
    }

    renderSquares(squares) {
        let rowCount = 0;

        for (const square of squares) {
            this.#$rows[rowCount].appendChild(this._createSquare(square));

            if (square.getY() % this.#rowAmount === 0) {
                rowCount++;
            }
        }
    }

    _createSquare(square) {
        const $square = this.createElement('div', 'square');

        const squareProduct = square.getProduct();

        if (squareProduct) {
            const image = squareProduct.getImage();

            if (image) {
                $square.style.backgroundImage = `url(${image})`;
            } else {
                $square.textContent = squareProduct.getName().substring(0, 5).toUpperCase();
            }
        }

        if (square.hasObstacle()) {
            $square.classList.add('square-obstruction');
        } else {
            this.bindEventHandlersToSquares($square);
        }
        $square.dataset.x = square.getX();
        $square.dataset.y = square.getY();
        $square.dataset.type = 'square';
        $square.id = `${square.getX()}-${square.getY()}`;

        return $square;
    }

    updateSquare(square) {
        const $newSquare = this._createSquare(square);
        const $oldSquare = document.getElementById(`${square.getX()}-${square.getY()}`);
        $oldSquare.replaceWith($newSquare);
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

        if (!/product|square/.test($draggedElement.dataset.type)) {
            return;
        }

        const xTarget = +ev.currentTarget.dataset.x;
        const yTarget = +ev.currentTarget.dataset.y;

        if ($draggedElement.dataset.type === 'square') {
            this.bindEventHandlersToSquares($draggedElementClone, $targetClone);

            const xDrag = +$draggedElementClone.dataset.x;
            const yDrag = +$draggedElementClone.dataset.y;

            this.#onSquareDropHandler({xDrag, yDrag}, {xTarget, yTarget});

            Object.assign($draggedElementClone.dataset, ev.currentTarget.dataset);
            Object.assign($targetClone.dataset, $draggedElement.dataset);
            $draggedElementClone.id = ev.currentTarget.id;
            $targetClone.id = $draggedElement.id;

            ev.currentTarget.replaceWith($draggedElementClone);
            $draggedElement.replaceWith($targetClone);
            return;
        }

        this.bindEventHandlersToSquares($targetClone);

        const productName = $draggedElement.dataset.productName;
        this.#onProductDropHandler(productName, {xTarget, yTarget});
        $draggedElement.remove();
        $targetClone.textContent = productName;
        ev.currentTarget.replaceWith($targetClone);
    };
}
