import {BaseView} from './BaseView';

export class RootView extends BaseView {
    #clothesRegionButton;
    #tierlantineRegionButton;
    #decorationRegionButton;

    constructor() {
        super();

        const app = this.getElement('#app');
        this.$root = this.createElement('div');

        this.#clothesRegionButton = this.createElement('button');
        this.#clothesRegionButton.textContent = 'Kleding';

        this.#tierlantineRegionButton = this.createElement('button');
        this.#tierlantineRegionButton.textContent = 'Tierlantine';

        this.#decorationRegionButton = this.createElement('button');
        this.#decorationRegionButton.textContent = 'Decoraties';

        this.$root.append(this.#clothesRegionButton, this.#tierlantineRegionButton, this.#decorationRegionButton);

        app.append(this.$root);
    }

    bindClickClothesButton(handler) {
        this.#clothesRegionButton.addEventListener('click', () => handler())
    }

    bindClickTierlantineButton(handler) {
        this.#tierlantineRegionButton.addEventListener('click', () => handler())
    }

    bindClickDecorationButton(handler) {
        this.#decorationRegionButton.addEventListener('click', () => handler())
    }
}