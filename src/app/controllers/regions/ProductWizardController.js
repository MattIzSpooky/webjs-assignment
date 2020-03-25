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
        console.log(...form);
        //const city = form.get('city');

        //this.#model.*
    };
}