import {Region} from '../../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../../views/RegionView';
import {UnmanagedProductController} from '../UnmanagedProductController';

export class TierlantineRegionController extends BaseRegionController {
    constructor() {
        super();
        this._model = new Region('tierlantine', (x, y) => y % 6 === 0 && x % 6 === 0);
        this._view = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareClick, this.onProductDrop);

        this.renderView();
        this.unmanagedProductController = new UnmanagedProductController(this._model);

        this._view.attachView(this.unmanagedProductController.getView());
    }
}
