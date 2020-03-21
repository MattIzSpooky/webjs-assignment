import {Region} from '../models/Region';
import {BaseRegionController} from './BaseRegionController';

export class Region2Controller extends BaseRegionController{
    constructor() {
        super(new Region((x, y) => y % 6 === 0 && x % 6 === 0));
    }
}