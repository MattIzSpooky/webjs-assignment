import {RootView} from '../views/RootView';
import {Region1Controller} from './Region1Controller';
import {Region2Controller} from './Region2Controller';

export class RootController {
    #view;
    #currentRegion;

    constructor() {
        this.#view = new RootView();

        this.#currentRegion = new Region1Controller();

        this.#view.bindClickRegion1Button(this.#onClickRegion1);
        this.#view.bindClickRegion2Button(this.#onClickRegion2);
    }

    #onClickRegion1 = () => {
        if (this.#currentRegion instanceof Region1Controller) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new Region1Controller();
    };

    #onClickRegion2 = () => {
        if (this.#currentRegion instanceof Region2Controller) {
            return;
        }

        this.#currentRegion.destroy();
        this.#currentRegion = new Region2Controller();
    };
}