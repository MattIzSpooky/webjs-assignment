import {BaseView} from './BaseView';

// https://github.com/taniarascia/mvc/blob/master/script.js
export class TestView extends BaseView {
    #countElement;
    #incrementButton;
    #decrementButton;

    constructor() {
        super();
        // The root element
        const app = this.getElement('#app');

        // The title of the app
        const title = this.createElement('h1');
        title.textContent = 'Increment';

        this.#countElement = this.createElement('h2');
        this.#incrementButton = this.createElement('button');
        this.#incrementButton.textContent = '+';

        this.#decrementButton = this.createElement('button');
        this.#decrementButton.textContent = '-';

        app.append(title, this.#countElement, this.#incrementButton, this.#decrementButton);
    }

    bindIncrement(handler) {
        this.#incrementButton.addEventListener('click', () => handler())
    }

    bindDecrement(handler) {
        this.#decrementButton.addEventListener('click', () => handler())
    }

    renderCount(count) {
        this.#countElement.textContent = count;
    }
}