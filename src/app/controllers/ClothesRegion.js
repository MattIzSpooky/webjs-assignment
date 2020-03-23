import {Region} from '../models/Region';
import {BaseRegionController} from './BaseRegionController';
import {RegionView} from '../views/RegionView';

export class ClothesRegion extends BaseRegionController {
    constructor() {
        super();
        this._regionModel = new Region('clothes', (x, y) => y % 4 === 0 && x % 4 === 0);
        this._regionView = new RegionView(Region.AMOUNT_OF_ROWS, this.onSquareDrag, this.onSquareDrop, this.onSquareCLickOverriden);

        this.renderView();
    }

    onSquareCLickOverriden = (ev) => {
        console.log('overridden!');
        this.onSquareClick(ev);
    };
}