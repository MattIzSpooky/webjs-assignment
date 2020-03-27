import {Controller} from "../Controller";
import {DecorationWizardView} from "../../views/DecorationWizardView";
import {ClothesWizardView} from "../../views/ClothesWizardView";
import {TierlantineWizardView} from "../../views/TierlantineWizardView";

export class ProductWizardController extends Controller {

    constructor(props) {
        super(props);

        this._switchScene();
    }

    _switchScene(name) {
        this.destroy();

        switch (name) {
            case 'clothes':
                this._view = new ClothesWizardView();
                this._bindEvents();
                this._view.bindOnFormSubmit(this.#onAddProduct);
                break;
            case 'tierlantine':
                this._view = new TierlantineWizardView();
                this._bindEvents();
                this._view.bindOnFormSubmit(this.#onAddProduct);
                break;
            case 'decoration':
                this._view = new DecorationWizardView();
                this._bindEvents();
                this._view.bindOnFormSubmit(this.#onAddProduct);
                break;
            default:
                this._view = new ClothesWizardView();
                this._bindEvents();
                this._view.bindOnFormSubmit(this.#onAddProduct);
                break;
        }
    }

    _bindEvents() {
        this._view.bindDecorationPageButton(this.#onDecorationPageClick);
        this._view.bindClothesPageButton(this.#onClothesPageClick);
        this._view.bindTierlantinePageButton(this.#onTielantinePageClick);
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

    #onDecorationPageClick = () => {
        this._switchScene('decoration');
    };

    #onTielantinePageClick = () => {
        this._switchScene('tierlantine');
    };

    #onClothesPageClick = () => {
        this._switchScene('clothes');
    };
}