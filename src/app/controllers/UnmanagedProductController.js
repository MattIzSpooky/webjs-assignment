import {Controller} from './Controller';
import {UnmanagedProductsView} from '../views/UnmanagedProductsView';

export class UnmanagedProductController extends Controller {
    getView() {
        return this._view.getView();
    }

    constructor(region) {
        super();
        this._view = new UnmanagedProductsView();
        this._model = region;

        const products = this._model.getUnmanagedProducts();

        if (products.length > 0) {
            this._view.rerenderProductDropdown(products);
        }

        this._view.bindDropdownChange(this.#onDropdownChange);
    }

    #onDropdownChange = (value) => {
        if (value === 'Select a product') {
            this._view.clearCurrentProduct();
            return;
        }

        const currentProduct = this._model.findUnmanagedProduct(value);
        this._view.renderCurrentProduct(currentProduct);
    };


    rerenderDropdown() {
        this._view.clearCurrentProduct();
        this._view.rerenderProductDropdown(this._model.getUnmanagedProducts());
    }
}