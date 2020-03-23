import {RootView} from '../views/RootView';
import {ClothesRegion} from './ClothesRegion';
import {TierlantineRegion} from './TierlantineRegion';
import {DecorationRegion} from './DecorationRegion';

export class RootController {
    #view;
    #currentRegion;

    constructor() {
        this.#view = new RootView();

        this._recoverFromUrl();

        this.#view.bindClickClothesButton(this.#onClickClothesRegion);
        this.#view.bindClickTierlantineButton(this.#onClickTiertineRegion);
        this.#view.bindClickDecorationButton(this.#onClickDecorationButton);
    }

    _recoverFromUrl() {
        const parts = location.pathname.split('/');
        const part = parts[1];

        let region;

        switch (part) {
            case 'clothes':
                region = new ClothesRegion();
                break;
            case 'tierlantine':
                region = new TierlantineRegion();
                break;
            case 'decoration':
                region = new DecorationRegion();
                break;
            default:
                region = new ClothesRegion();
                break;
        }

        this.#currentRegion = region;
    }

    #onClickClothesRegion = () => {
        if (this.#currentRegion instanceof ClothesRegion) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new ClothesRegion();
        history.pushState(null, 'Clothes', '/clothes');
    };

    #onClickTiertineRegion = () => {
        if (this.#currentRegion instanceof TierlantineRegion) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new TierlantineRegion();
        history.pushState(null, 'Tierlantine', '/tierlantine');
    };

    #onClickDecorationButton = () => {
        if (this.#currentRegion instanceof DecorationRegion) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new DecorationRegion();
        history.pushState(null, 'Decoration', '/decoration');
    };
}