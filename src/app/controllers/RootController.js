import {RootView} from '../views/RootView';
import {ClothesRegionController} from './regions/ClothesRegionController';
import {TierlantineRegionController} from './regions/TierlantineRegionController';
import {DecorationRegionController} from './regions/DecorationRegionController';
import {WeatherController} from './WeatherController';
import {Controller} from './Controller';
import {ProductWizardController} from "./regions/ProductWizardController";

export class RootController extends Controller {
    #current;

    constructor() {
        super();
        this._view = new RootView();

        this._recoverFromUrl();

        this._view.bindClickClothesButton(this.#onClickClothesRegion);
        this._view.bindClickTierlantineButton(this.#onClickTiertineRegion);
        this._view.bindClickDecorationButton(this.#onClickDecorationButton);
        this._view.bindClickWeatherButton(this.#onClickWeatherButton);
        this._view.bindClickProductsButton(this.#onClickProductsButton());
    }

    _recoverFromUrl() {
        const parts = location.pathname.split('/');
        const part = parts[1];

        let controller;

        switch (part) {
            case 'clothes':
                controller = new ClothesRegionController();
                break;
            case 'tierlantine':
                controller = new TierlantineRegionController();
                break;
            case 'decoration':
                controller = new DecorationRegionController();
                break;
            case 'weather':
                controller = new WeatherController();
                break;
            case 'products':
                controller = new ProductWizardController();
                break;
            default:
                controller = new ClothesRegionController();
                break;
        }

        this.#current = controller;
    }

    #onClickClothesRegion = () => {
        this._changeView(ClothesRegionController, 'Clothes');
    };

    #onClickTiertineRegion = () => {
        this._changeView(TierlantineRegionController, 'Tierlantine');
    };

    #onClickDecorationButton = () => {
        this._changeView(DecorationRegionController, 'Decoration');
    };

    #onClickWeatherButton = () => {
        this._changeView(WeatherController, 'Weather');
    };

    #onClickProductsButton = () => {
        this._changeView(ProductWizardController, 'Products');
    };

    _changeView(controller, title) {
        if (location.pathname.includes(title.toLowerCase())) {
            return;
        }

        this.#current.destroy();
        this.#current = new controller();
        history.pushState(null, title, `/${title.toLowerCase()}`);
    }
}