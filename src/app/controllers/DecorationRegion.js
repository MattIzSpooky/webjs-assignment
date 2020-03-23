import {Region} from '../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../views/RegionView';

export class DecorationRegion extends BaseRegionController {
    constructor() {
        super();
        this._regionModel = new Region('decoration', (x, y) => y % 3 === 0 || x % 4 === 0);
        this._regionView = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareClick);

        this.renderView();
    }
}