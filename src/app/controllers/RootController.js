import {RootView} from '../views/RootView';
import {WeatherController} from './WeatherController';
import {Controller} from './Controller';
import {ProductWizardController} from './regions/ProductWizardController';
import {RegionController} from './regions/RegionController';
import {Region} from '../models/Region';

export class RootController extends Controller {
    /**
     * @type {Controller}
     */
    #current;

    constructor() {
        super();
        this._view = new RootView();

        this._recoverFromUrl();

        this._view.bindClickClothesButton(this.#onClickClothesRegion);
        this._view.bindClickTierlantineButton(this.#onClickTiertineRegion);
        this._view.bindClickDecorationButton(this.#onClickDecorationButton);
        this._view.bindClickWeatherButton(this.#onClickWeatherButton);
        this._view.bindClickProductsButton(this.#onClickProductsButton);
    }

    _recoverFromUrl() {
        const parts = location.pathname.split('/');
        const part = parts[1];

        let controller;

        switch (part) {
            case 'tierlantine':
                controller = new RegionController(new Region('tierlantine', (x, y) => y % 6 === 0 && x % 6 === 0));
                break;
            case 'decoration':
                controller = new RegionController(new Region('decoration', (x, y) => y % 3 === 0 || x % 4 === 0));
                break;
            case 'weather':
                controller = new WeatherController();
                break;
            case 'products':
                controller = new ProductWizardController();
                break;
            case 'clothes':
            default:
                controller = new RegionController(new Region('clothes', (x, y) => y % 4 === 0 && x % 4 === 0));
                break;
        }

        this.#current = controller;
    }

    #onClickClothesRegion = () => {
        this._changeView(new RegionController(new Region('clothes', (x, y) => y % 4 === 0 && x % 4 === 0)), 'Clothes');
    };

    #onClickTiertineRegion = () => {
        this._changeView(new RegionController(new Region('tierlantine', (x, y) => y % 6 === 0 && x % 6 === 0)), 'Tierlantine');
    };

    #onClickDecorationButton = () => {
        this._changeView(new RegionController(new Region('decoration', (x, y) => y % 3 === 0 || x % 4 === 0)), 'Decoration');
    };

    #onClickWeatherButton = () => {
        this._changeView(new WeatherController(), 'Weather');
    };

    #onClickProductsButton = () => {
        this._changeView(new ProductWizardController(), 'Products');
    };

    /**
     * @param {Controller} controller
     * @param {String} title
     * @private
     */
    _changeView(controller, title) {
        this.#current.destroy();
        this.#current = controller;
        history.pushState(null, title, `/${title.toLowerCase()}`);
    }
}