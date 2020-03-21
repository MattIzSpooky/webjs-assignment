import {Column} from '../util/column';

export class BaseView {
    $root;

    constructor() {
        if (new.target === BaseView) {
            throw new TypeError('Cannot construct BaseView instances directly');
        }
    }

    createElement(tag, className) {
        const element = document.createElement(tag);

        if (className) element.classList.add(className);

        return element;
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    createRow() {
        const div = this.createElement('div');
        div.classList.add('row');
        return div;
    }

    createColumn(column) {
        if (!Column.isValid(column)) {
            throw new Error('Invalid column');
        }

        const div = this.createElement('div');
        div.classList.add(column);

        return div;
    }

    destroyView() {
        this.$root.remove();
    }
}
