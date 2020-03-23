import {Region} from '../../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../../views/RegionView';

export class DecorationRegionController extends BaseRegionController {
    constructor() {
        super();
        this._model = new Region('decoration', (x, y) => y % 3 === 0 || x % 4 === 0);
        this._view = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareClick);

        this.renderView();
    }
}