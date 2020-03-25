import {Controller} from '../Controller';
import {fileToBase64} from '../../util/file';

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
        this._view.clearCurrentProduct();
        this._view.rerenderProductDropdown(this._model.getUnmanagedProducts());
    };

    onDropdownChange = (value) => {
        if (value === 'Select a product') {
            this._view.clearCurrentProduct();
            return;
        }

        const currentProduct = this._model.findUnmanagedProduct(value);
        this._view.renderCurrentProduct(currentProduct);
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

        const products = this._model.getUnmanagedProducts();

        if (products.length > 0) {
            this._view.rerenderProductDropdown(products);
        }
    }

    /**
     *
     * @param {FormData} formData
     * @param {Clothes} product
     *  @param {Square} square
     * @returns {Promise<void>}
     */
    onProductDetailsForm = async (formData, product, square) => {
        try {
            product.setDescription(formData.get('description'));

            const imageFile = formData.get('productImage');

            if (imageFile.size > 0) {
                product.setImage(await fileToBase64(imageFile));
            } else {
                product.setImage(null);
            }

            this._model._persist();
            this._view.updateSquare(square);
        } catch (e) {
            this.showError(`Error`, e.message);
        }
    };
}