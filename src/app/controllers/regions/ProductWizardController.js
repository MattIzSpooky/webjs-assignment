import {Controller} from "../Controller";
import {DecorationWizardView} from "../../views/DecorationWizardView";

export class ProductWizardController extends Controller {
    constructor(props) {
        super(props);

        this._view = new DecorationWizardView();
        this._view.bindOnFormSubmit(this.#onAddProduct);
    }

    #onAddProduct = (ev) => {
        ev.preventDefault();
        const form = new FormData(ev.target);

        if (this._view.getCurrentIndex() === 3) {
            console.log(...form);

            // Model action

            this._reset(ev);
        }
    };

    _reset(ev) {
        ev.target.reset();
        this._view.setCurrentIndex(0);
        this._view.showTab(this._view.getCurrentIndex());
    }
}