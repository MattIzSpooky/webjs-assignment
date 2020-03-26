import {Region} from '../../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../../views/RegionView';
import {Tierlantine} from '../../models/Tierlantine';

export class TierlantineRegionController extends BaseRegionController {
    constructor() {
        super();
        this._model = new Region('tierlantine', (x, y) => y % 6 === 0 && x % 6 === 0);
        this._view = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareClick, this.onProductDrop, this.onProductDetailsForm, this.onProductDetailsImageClick);

        this.renderView();
        this._view.bindNewProductClick(this.#onNewProductClick);
        this._view.bindDropdownChange(this.onDropdownChange);
    }

    #onNewProductClick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        try {
            const clothes = new Tierlantine('test', 'description', 3, 4, 5, 50);
            this._model.addUnmanagedProduct(clothes);
            this._view.rerenderProductDropdown(this._model.getUnmanagedProducts());
        } catch (e) {
            this.showError('Error', e.message);
        }
    };
}