import {BaseView, Input} from './BaseView';
import * as JsBarcode from 'jsbarcode';
import {fileToBase64} from '../util/file';
import cashSound from '../../assets/sounds/cash.mp3'

export class ProductDetailView extends BaseView {
    #$productDetailsForm;

    #onProductDetailsImageClick;
    #onProductDetailsForm;
    #onClose;

    constructor(product, onProductDetailsForm, onClose, onProductDetailsImageClick) {
        super();

        this.showProductEdit(product);

        this.#onProductDetailsForm = onProductDetailsForm;
        this.#onClose = onClose;
        this.#onProductDetailsImageClick = onProductDetailsImageClick;
    }

    /**
     * @param {Product} product
     */
    showProductEdit(product) {
        if (this.#$productDetailsForm) {
            return;
        }

        const $div = this.createElement('div', 'product-details');
        this.$root = this.createElement('div');
        this.#$productDetailsForm = $div;

        const $header = this.createElement('div', 'product-details-header');

        const $closeButton = this.createElement('span', 'close', 'text-black');
        $closeButton.textContent = 'X';

        $closeButton.onclick = () => this.#onClose();

        const $barcodeRow = this.createRow();
        $barcodeRow.classList.add('justify-content-center');

        const $barcode = this.createElement('canvas', 'product-details-barcode');
        JsBarcode($barcode, product.getName());

        $barcodeRow.append($barcode);

        const $title = this.createElement('h2');

        $title.textContent = product.getName();

        $header.append($closeButton, $title);

        const $modal = this.createModal();

        const $content = this.createElement('div', 'product-details-body');

        const $form = this.createForm(
            new Input('comment', 'text', product.getComment()),
            new Input('productImage', 'file'),
        );

        const $fileInput = $form.querySelector('#productImage');
        $fileInput.accept = 'image/png, image/jpeg';

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
                this.#onProductDetailsImageClick();
            }
        }


        const $customButton = this.createElement('button', 'btn', 'btn-success');
        $customButton.textContent = 'Add custom field';
        $customButton.type = 'button';

        let customFieldIndex = 0;

        const customAttributes = product.getCustomAttributes();

        $customButton.onclick = () => {
            $form.insertBefore(this._createCustomField(`custom-${customFieldIndex}`), $form.lastChild.previousSibling);
            customFieldIndex++;
        };

        $form.append($customButton);

        const $canvasWrapper = this._createCanvas();

        $form.insertBefore($canvasWrapper, $form.lastChild.previousSibling);

        if (customAttributes.length > 0) {
            const $elements = customAttributes.map(attribute => this._createCustomField(attribute.name, attribute.value));
            $elements.forEach($e => $form.insertBefore($e, $form.lastChild.previousSibling));
        }

        const $tip = this.createElement('small');
        $tip.textContent = `Tip: You can change the custom field's by selecting the name and start typing. The div is contenteditable`;

        $content.append($form, $tip);

        $modal.firstChild.append($header, $barcodeRow, $content);

        $div.append($modal);

        this.$root.prepend($div);

        this._bindCanvasLogic(product, $canvasWrapper);

        $form.onsubmit = async (ev) => {
            ev.preventDefault();

            const success = await this.#onProductDetailsForm(new FormData(ev.target), $canvasWrapper.firstChild.firstChild.toDataURL('image/png'));

            if (success) {
                await new Audio(cashSound).play();
                this.#onClose();
            }
        };

        const app = this.getElement('#app');

        app.prepend(this.$root);
    }

    _createCanvas() {
        const $canvasWrapper = this.createElement('div', 'form-group');
        const $row = this.createRow();
        $row.classList.add('justify-content-center');

        const $canvas = this.createElement('canvas', 'product-details-canvas');
        const $clearButton = this.createElement('button', 'btn', 'btn-danger');
        $clearButton.type = 'button';
        $clearButton.textContent = 'Clear';
        $row.append($canvas);
        $canvasWrapper.append($row, $clearButton);

        return $canvasWrapper;
    }

    _bindCanvasLogic(product, $canvasWrapper) {
        let mousePressed = false;
        let lastX, lastY;
        const $canvas = $canvasWrapper.querySelector('canvas');
        const $clearButton = $canvasWrapper.lastChild;

        const ctx = $canvas.getContext('2d');

        const signDrawing = product.getSignImage();

        if (signDrawing) {
            const image = new Image();
            image.onload = () => ctx.drawImage(image, 0, 0);
            image.src = signDrawing;
        }

        const draw = (x, y, isDown) => {
            if (isDown) {
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.lineJoin = 'round';
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.closePath();
                ctx.stroke();
            }

            lastX = x;
            lastY = y;
        };

        $clearButton.onclick = () => {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        };

        $canvas.onmousedown = (e) => {
            mousePressed = true;
            const rect = $canvas.getBoundingClientRect();
            draw(e.clientX - rect.left, e.clientY - rect.top, false);
        };

        $canvas.onmousemove = (e) => {
            if (mousePressed) {
                const rect = $canvas.getBoundingClientRect();
                draw(e.clientX - rect.left, e.clientY - rect.top, true);
            }
        };

        $canvas.onmouseup = () => {
            mousePressed = false;
        };

        $canvas.onmouseleave = () => {
            mousePressed = false;
        };
    }

    _createCustomField(name, value) {
        const $customInput = this.createInput(new Input(name, 'text', value));

        const $label = $customInput.firstChild;
        $label.contentEditable = true;

        $label.addEventListener('input', (ev) => {
            const nameForInput = ev.target.textContent;
            $label.setAttribute('for', nameForInput);
            $customInput.lastChild.previousSibling.name = nameForInput;
        });

        const $deleteButton = this.createElement('button', 'btn', 'btn-danger');
        $deleteButton.textContent = 'Remove';

        $deleteButton.onclick = () => {
            $customInput.remove();
        };

        $customInput.append($deleteButton);

        return $customInput;
    }
}
