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
        this._changeView(ClothesRegion, 'Clothes');
    };

    #onClickTiertineRegion = () => {
        this._changeView(TierlantineRegion, 'Tierlantine');
    };

    #onClickDecorationButton = () => {
        this._changeView(DecorationRegion, 'Decoration');
    };

    _changeView(currentRegion, title) {
        if (location.pathname.includes(title.toLowerCase())) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new currentRegion();
        history.pushState(null, title, `/${title.toLowerCase()}`);
    }
}