import {Destroyable} from '../util/destroyable';

export class Controller extends Destroyable {
    /**
     * @type {*}
     */
    _view;

    /**
     * @type {*}
     */
    _model;

    constructor() {
        super();
        if (new.target === Controller) {
            throw new TypeError('Cannot construct BaseController instances directly');
        }
    }

    /**
     * Destroys everything associated with the controller.
     * It is advised to override this if you need to delete private variables.
     */
    destroy() {
        this._model = null;
        this._view?.destroy();
    }

    /**
     * @param {String} title
     * @param {String} message
     */
    showError(title, message) {
        if (this._view) {
            this._view.showErrorModal(title, message);
        } else {
            throw new Error('No view is set');
        }
    }

    /**
     * @param {String} message
     */
    showSucceed(message) {
        if (this._view) {
            this._view.showSucceedModal(message);
        } else {
            throw new Error('No view is set');
        }
    }
}