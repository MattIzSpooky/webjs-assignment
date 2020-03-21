import {BaseView} from './BaseView';

export class RootView extends BaseView {
    #$region1Button;
    #$region2Button;

    constructor() {
        super();

        const app = this.getElement('#app');
        this.$root = this.createElement('div');

        this.#$region1Button = this.createElement('button');
        this.#$region1Button.textContent = 'Region 1';

        this.#$region2Button = this.createElement('button');
        this.#$region2Button.textContent = 'Region 2';

        this.$root.append(this.#$region1Button, this.#$region2Button);

        app.append(this.$root);
    }

    bindClickRegion1Button(handler) {
        this.#$region1Button.addEventListener('click', () => handler())
    }

    bindClickRegion2Button(handler) {
        this.#$region2Button.addEventListener('click', () => handler())
    }
}