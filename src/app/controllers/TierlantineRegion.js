import {Region} from '../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../views/RegionView';

export class TierlantineRegion extends BaseRegionController {
    constructor() {
        super();
        this._regionModel = new Region('tierlantine', (x, y) => y % 6 === 0 && x % 6 === 0);
        this._regionView = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareClick);

        this.renderView();
    }
}