import {Controller} from "../Controller";
import {DecorationWizardView} from "../../views/DecorationWizardView";
import {ClothesWizardView} from "../../views/ClothesWizardView";
import {TierlantineWizardView} from "../../views/TierlantineWizardView";

export class ProductWizardController extends Controller {
    constructor(props) {
        super(props);

        this._initialize();

        this._view.bindOnFormSubmit(this.#onAddProduct);
    }

    _initialize() {
        switch (true) {
            case 'clothes':
                this._view = new ClothesWizardView();
                // How to init model
                break;
            case 'tierlantine':
                this._view = new TierlantineWizardView();
                break;
            case 'decoration':
                this._view = new DecorationWizardView();
                break;
            default:
                this._view = new ClothesWizardView();
                break;
        }
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