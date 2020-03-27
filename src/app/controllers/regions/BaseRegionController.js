import {Controller} from '../Controller';
import {fileToBase64} from '../../util/file';
import {CustomAttribute} from '../../models/product';

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

        this.unmanagedProductController.rerenderDropdown();
    };

    onSquareClick = (ev) => {
        ev.preventDefault();

        const squares = this._model.getSquares();

        const {x, y} = ev.currentTarget.dataset;

        const square = this._findSquareByCoords(squares, +x, +y);

        const product = square.getProduct();

        if (product) {
            this._view.showProductEdit(square);
        }
    };

    _findSquareByCoords(squares, x, y) {
        return squares.find(square => square.getX() === x && square.getY() === y)
    }

    renderView() {
        this._view.renderSquares(this._model.getSquares());
    }

    /**
     * @param {FormData} formData
     * @param {Clothes} product
     * @param {Square} square
     * @param {String} drawing
     * @returns {Promise<void>}
     */
    onProductDetailsForm = async (formData, product, square, drawing) => {
        try {
            product.setComment(formData.get('comment'));

            const imageFile = formData.get('productImage');

            if (imageFile.size > 0) {
                product.setImage(await fileToBase64(imageFile));
            }

            product.setSignImage(drawing);

            product.clearCustomAttributes();
            // Remove the ones we dont want as custom. we already have their data.
            formData.delete('comment');
            formData.delete('productImage');

            for (const [key, value] of formData) {
                product.addCustomAttribute(new CustomAttribute(key, value));
            }

            this._model._persist();
            this._view.updateSquare(square);
        } catch (e) {
            this.showError(`Error`, e.message);
        }
    };

    onProductDetailsImageClick = (square) => {
        const product = square.getProduct();

        if (product) {
            product.setImage(null);
            this._model._persist();
            this._view.updateSquare(square);
        }
    }
}