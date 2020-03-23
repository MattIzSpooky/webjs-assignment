import {Destroyable} from '../util/destroyable';

export class Controller extends Destroyable {
    _view;
    _model;

    constructor() {
        super();
        if (new.target === Controller) {
            throw new TypeError('Cannot construct BaseController instances directly');
        }
    }

    destroy() {
        this._model = null;

        if (this._view) {
            this._view.destroy();
        }
    }
}