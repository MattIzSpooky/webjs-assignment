import {Region} from '../../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../../views/RegionView';
import {Decoration} from '../../models/Decoration';

export class DecorationRegionController extends BaseRegionController {
    constructor() {
        super();
        this._model = new Region('decoration', (x, y) => y % 3 === 0 || x % 4 === 0);
        this._view = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareClick, this.onProductDrop);

        this.renderView();
        this._view.bindNewProductClick(this.#onNewProductClick);
        this._view.bindDropdownChange(this.onDropdownChange);
    }

    #onNewProductClick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        try {
            const clothes = new Decoration('test', 'description', 3, 4, 5, '#000000', 3, 20);
            this._model.addUnmanagedProduct(clothes);
            this._view.rerenderProductDropdown(this._model.getUnmanagedProducts());
        } catch (e) {
            this.showError('Error', e.message);
        }
    };
}