import {Region} from '../../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {Clothes} from '../../models/Clothes';
import {RegionView} from '../../views/RegionView';
import {UnmanagedProductController} from '../UnmanagedProductController';

export class ClothesRegionController extends BaseRegionController {
    unmanagedProductController;

    constructor() {
        super();
        this._model = new Region('clothes', (x, y) => y % 4 === 0 && x % 4 === 0);
        this._view = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareClick, this.onProductDrop);

        this.renderView();

        this.unmanagedProductController = new UnmanagedProductController(this._model, this.onNewProductClick);

        this._view.attachView(this.unmanagedProductController.getView());
    }

    onNewProductClick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        try {
            const clothes = new Clothes('test', 'description', 3, 4, 5, '#000000', 3);
            this._model.addUnmanagedProduct(clothes);
            this.unmanagedProductController.rerenderDropdown();
        } catch (e) {
            this.showError('Error', e.message);
        }
    };
}
