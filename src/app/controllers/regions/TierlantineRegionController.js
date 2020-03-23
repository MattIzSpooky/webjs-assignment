import {Region} from '../../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../../views/RegionView';

export class TierlantineRegionController extends BaseRegionController {
    constructor() {
        super();
        this._model = new Region('tierlantine', (x, y) => y % 6 === 0 && x % 6 === 0);
        this._view = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareClick);

        this.renderView();
    }
}