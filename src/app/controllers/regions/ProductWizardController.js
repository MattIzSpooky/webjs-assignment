import {Controller} from '../Controller';
import {DecorationWizardView} from '../../views/DecorationWizardView';
import {ClothesWizardView} from '../../views/ClothesWizardView';
import {TierlantineWizardView} from '../../views/TierlantineWizardView';
import {Clothes} from '../../models/Clothes';
import {Decoration} from '../../models/Decoration';
import {Tierlantine} from '../../models/Tierlantine';
import {BaseWizardView} from '../../views/BaseWizardView';

export class ProductWizardController extends Controller {
    constructor() {
        super();
        this._switchScene();
    }

    #onAddProduct = (ev) => {
        ev.preventDefault();


        if (this._view.getCurrentIndex() !== BaseWizardView.STEPS) {
            return;
        }
        const form = new FormData(ev.target);

        try {
            this._saveProduct(form);
            this.showSucceed('Succesfull stored');
        } catch (e) {
            this.showError('error', e.message);
        } finally {
            this._reset(ev);
        }
    };

    _saveProduct(form) {
        let product = null;

        const type = form.get('type');

        switch (type) {
            case 'clothes':
                product = new Clothes(form.get('name'),
                    form.get('description'), form.get('purchasePrice'), form.get('minimalStock'),
                    form.get('currentStock'), form.get('color'), form.get('size'));
                break;
            case 'decoration':
                product = new Decoration(form.get('name'),
                    form.get('description'), form.get('purchasePrice'), form.get('minimalStock'),
                    form.get('currentStock'), form.get('color'), form.get('size'), form.get('packageCount'));
                break;
            case 'tierlantine':
                product = new Tierlantine(form.get('name'),
                    form.get('description'), form.get('purchasePrice'), form.get('minimalStock'),
                    form.get('currentStock'), form.get('weight'));
                break;
            default:
                throw new Error(`Unknown product type: ${type}`)
        }

        product.saveToUnmanaged();
    }

    _reset(ev) {
        ev.target.reset();
        this._view.setCurrentIndex(0);
        this._view.showTab(this._view.getCurrentIndex());
    }

    _switchScene(name) {
        this.destroy();

        let view;

        switch (name) {
            case 'clothes':
                view = new ClothesWizardView();
                break;
            case 'tierlantine':
                view = new TierlantineWizardView();
                break;
            case 'decoration':
                view = new DecorationWizardView();
                break;
            default:
                view = new ClothesWizardView();
                break;
        }

        this._view = view;
        this._bindEvents();
        this._view.bindOnFormSubmit(this.#onAddProduct);
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