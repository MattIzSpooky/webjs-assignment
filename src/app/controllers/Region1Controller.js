import {Region} from '../models/Region';
import {BaseRegionController} from './BaseRegionController';

export class Region1Controller extends BaseRegionController {
    constructor() {
        super(new Region((x, y) => y % 4 === 0 && x % 4 === 0));
    }

    _onSquareClick(ev) {
        console.log('Click in region 1!');
        super._onSquareClick(ev); // TODO Find out how to call parent function. This seems to call a static
    }
}