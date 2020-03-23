import {RootView} from '../views/RootView';
import {ClothesRegion} from './ClothesRegion';
import {TierlantineRegion} from './TierlantineRegion';
import {DecorationRegion} from './DecorationRegion';

export class RootController {
    #view;
    #currentRegion;

    constructor() {
        this.#view = new RootView();

        this.#currentRegion = new ClothesRegion();

        this.#view.bindClickClothesButton(this.#onClickClothesRegion);
        this.#view.bindClickTierlantineButton(this.#onClickTiertineRegion);
        this.#view.bindClickDecorationButton(this.#onClickDecorationButton);
    }

    #onClickClothesRegion = () => {
        if (this.#currentRegion instanceof ClothesRegion) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new ClothesRegion();
    };

    #onClickTiertineRegion = () => {
        if (this.#currentRegion instanceof TierlantineRegion) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new TierlantineRegion();
    };

    #onClickDecorationButton = () => {
        if (this.#currentRegion instanceof DecorationRegion) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new DecorationRegion();
    };
}