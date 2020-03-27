import {Controller} from "../Controller";
import {DecorationWizardView} from "../../views/DecorationWizardView";
import {ClothesWizardView} from "../../views/ClothesWizardView";
import {TierlantineWizardView} from "../../views/TierlantineWizardView";
import {Clothes} from "../../models/Clothes";

export class ProductWizardController extends Controller {
    constructor(props) {
        super(props);

        this._switchScene();
    }

    #onAddProduct = (ev) => {
        ev.preventDefault();
        const form = new FormData(ev.target);

        if (this._view.getCurrentIndex() === this._view.STEPS) {
            this._saveProduct(form);

            this._reset(ev);
        }
    };

    _saveProduct(form) {
        let product = new Clothes(form.get('name'),
            form.get('description'), form.get('purchasePrice'), form.get('minimalStock'),
            form.get('currencStock'), form.get('color'), form.get('size'));

        product.saveUnmanaged();

        console.log(product);
    }

    _reset(ev) {
        ev.target.reset();
        this._view.setCurrentIndex(0);
        this._view.showTab(this._view.getCurrentIndex());
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