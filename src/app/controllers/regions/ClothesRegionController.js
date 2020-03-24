import {Region} from '../../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../../views/RegionView';
import {Clothes} from '../../models/Clothes';

export class ClothesRegionController extends BaseRegionController {
    constructor() {
        super();
        this._model = new Region('clothes', (x, y) => y % 4 === 0 && x % 4 === 0);
        this._view = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.#onSquareCLickOverriden, this.onProductDrop);

        this.renderView();
        this._view.bindNewProductClick(this.#onNewProductClick);
        this._view.bindDropdownChange(this.onDropdownChange);
    }

    #onNewProductClick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        try {
            const clothes = new Clothes('test', 'description', 3, 4, 5, '#000000', 3);
            this._model.addUnmanagedProduct(clothes);
            this._view.rerenderProductDropdown(this._model.getUnmanagedProducts());
        } catch (e) {
            this.showError('Error', e.message);
        }
    };

    #onSquareCLickOverriden = (ev) => {
        console.log('overridden!');
        this.onSquareClick(ev);
    };
}