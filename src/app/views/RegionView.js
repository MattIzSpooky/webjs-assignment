import {BaseView, Input} from './BaseView';
import {ColumnBuilder} from '../util/column';
import {fileToBase64} from '../util/file';

export class RegionView extends BaseView {
    #$rows = [];
    #rowAmount;

    #onDragHandler;
    #onSquareDropHandler;
    #onClickHandler;
    #onProductDropHandler;
    onProductDetailsForm;

    #$newProductButton;
    #$unmanagedProductsDropdown;
    #$productDetailsForm;

    #$currentProduct;

    constructor(rowAmount, onDragHandler, onSquareDropHandler, onClickHandler, onProductDropHandler, onProductDetailsForm) {
        super();
        this.#rowAmount = rowAmount;
        this.#onDragHandler = onDragHandler;
        this.#onSquareDropHandler = onSquareDropHandler;
        this.#onClickHandler = onClickHandler;
        this.#onProductDropHandler = onProductDropHandler;
        this.onProductDetailsForm = onProductDetailsForm;

        const app = this.getElement('#app');

        for (let i = 0; i < rowAmount; i++) {
            this.#$rows.push(this.createRow());
        }

        const $row = this.createRow();

        const colBuilder = new ColumnBuilder()
            .addType('md');

        const $regionColumn = this.createColumn(colBuilder.addWidth(7).getResult());
        $regionColumn.append(...this.#$rows);

        const $productsColumn = this.createColumn(colBuilder.addWidth(3).getResult());
        this.#$newProductButton = this.createElement('button', 'btn', 'btn-primary');
        this.#$newProductButton.textContent = 'New product';

        const $formGroup = this.createElement('div', 'form-group', 'w-100');

        this.#$unmanagedProductsDropdown = this.createElement('select', 'form-control');
        this.#$unmanagedProductsDropdown.id = 'product';

        const $defaultOption = this.createElement('option');
        $defaultOption.textContent = 'Select a product';
        this.#$unmanagedProductsDropdown.append($defaultOption);

        $formGroup.append(this.#$unmanagedProductsDropdown);

        this.#$currentProduct = this.createElement('div');

        $productsColumn.append(this.#$newProductButton, $formGroup, this.#$currentProduct);

        $row.append($regionColumn, $productsColumn);

        this.$root.append($row);
        app.append(this.$root);
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
                $square.textContent = squareProduct.getName();
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

    bindNewProductClick(handler) {
        this.#$newProductButton.onclick = handler;
    }

    bindDropdownChange(handler) {
        this.#$unmanagedProductsDropdown.onchange = (ev) => {
            ev.preventDefault();
            handler(ev.target.value);
        };
    }

    renderCurrentProduct(product) {
        const $product = this.createElement('div');

        $product.textContent = product.getName();
        $product.id = product.getName();
        $product.draggable = true;
        $product.ondragstart = (ev) => this.#onDragHandler(ev);
        $product.ondragover = (ev) => ev.preventDefault();
        $product.dataset.type = 'product';
        $product.dataset.productName = product.getName();

        this.#$currentProduct.append($product);
    }

    clearCurrentProduct() {
        const $currentProduct = this.#$currentProduct;

        while ($currentProduct.firstChild) {
            $currentProduct.removeChild($currentProduct.firstChild)
        }
    }

    rerenderProductDropdown(products) {
        const dropdown = this.#$unmanagedProductsDropdown;
        const value = dropdown.value;

        while (dropdown.firstChild) {
            dropdown.removeChild(dropdown.firstChild)
        }

        const $defaultOption = this.createElement('option');
        $defaultOption.textContent = 'Select a product';
        dropdown.append($defaultOption);

        for (const product of products) {
            const $option = this.createElement('option');
            $option.value = product.getName();
            $option.textContent = product.getName();
            $option.selected = value === product.getName();

            dropdown.append($option);
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


    /**
     * @param {Square} square
     */
    showProductEdit(square) {
        const $div = this.createElement('div', 'product-details');
        const $header = this.createElement('div', 'product-details-header');

        const $closeButton = this.createElement('span', 'close', 'text-black');
        $closeButton.textContent = 'X';

        $closeButton.onclick = () => $div.remove();

        const $title = this.createElement('h2');

        const product = square.getProduct();

        $title.textContent = product.getName();

        $header.append($closeButton, $title);

        const $content = this.createElement('div', 'product-details-body');

        const $form = this.createForm(
            new Input('description', 'text', product.getDescription()),
            new Input('productImage', 'file'),
        );

        const $fileInput = $form.querySelector('#productImage');
        $fileInput.accept = 'image/png, image/jpeg';

        this.#$productDetailsForm = $form;

        const image = product.getImage();

        $fileInput.onchange = async () => {
            let $productDetails = this.getElement('.product-details-image');
            const img = await fileToBase64($fileInput.files[0]);

            if ($productDetails) {
                $productDetails.src = img;
            } else {
                const $currentImage = this.createElement('img', 'product-details-image');
                $currentImage.src = img;
                $fileInput.parentNode.append($currentImage);

                $productDetails = $currentImage;
            }

            $productDetails.onclick = () => {
                $fileInput.value = null;
                $productDetails.src = '';
            }
        };

        if (image) {
            const $currentImage = this.createElement('img', 'product-details-image');
            $currentImage.src = image;
            $fileInput.parentNode.append($currentImage);

            $currentImage.onclick = () => {
                $fileInput.value = null;
                $currentImage.src = '';
            }
        }

        $form.onsubmit = (ev) => {
            ev.preventDefault();
            this.onProductDetailsForm(new FormData(ev.target), product, square);
        };

        $content.append($form);

        $div.append($header, $content);

        this.$root.prepend($div);
    }

}