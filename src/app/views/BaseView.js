import {Column} from '../util/column';
import {Destroyable} from '../util/destroyable';

export class BaseView extends Destroyable {
    $root;

    constructor() {
        super();
        if (new.target === BaseView) {
            throw new TypeError('Cannot construct BaseView instances directly');
        }

        this.$root = this.createElement('div');
    }

    createElement(tag, ...classNames) {
        const element = document.createElement(tag);

        if (classNames.length > 0) {
            element.classList.add(...classNames);
        }

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

    createForm(...fields) {
        const $form = this.createElement('form');

        for (const field of fields) {
            $form.append(this.createInput(field));
        }

        const $submitButton = this.createElement('button', 'btn', 'btn-primary');
        $submitButton.type = 'submit';
        $submitButton.textContent = 'Submit';

        $form.append($submitButton);

        return $form;
    }

    /**
     *
     * @param {Input} input
     */
    createInput({type, name, defaultValue}) {
        const $inputGroup = this.createElement('div', 'form-group');

        const $label = this.createElement('label');
        $label.textContent = name;
        $label.setAttribute('for', name);

        const $input = this.createElement('input');
        $input.type = type;
        $input.id = name;
        $input.name = name;

        if (defaultValue) {
            $input.setAttribute('value', defaultValue);
        }

        if (type === 'file') {
            $input.classList.add('form-control-file')
        } else {
            $input.classList.add('form-control')
        }

        $inputGroup.append($label, $input);

        return $inputGroup;
    }

    createCard(title, ...texts) {
        const $card = this.createElement('div', 'card');
        const $content = this.createElement('div', 'card-body');

        let $title;

        if (title.tagName) {
            $title = title;
        } else {
            $title = this.createElement('div', 'card-header', 'bg-info', 'text-white');
            $title.textContent = title;
        }

        for (const text of texts) {
            const $text = this.createElement('p', 'card-text');
            $text.textContent = text;

            $content.append($text);
        }

        $card.append($title, $content);

        return $card;
    }

    destroy() {
        this.$root.remove();
    }

    showErrorModal(title, message) {
        const $modal = this.createElement('div', 'my-modal');

        const $modalContent = this.createElement('div', 'my-modal-content');

        const $modalHeader = this.createElement('div', 'my-modal-header');

        const $closeButton = this.createElement('span', 'close', 'text-black');
        $closeButton.textContent = 'X';

        $closeButton.onclick = () => $modal.remove();

        window.onclick = () => {
            $modal.remove();
            window.onclick = null;
        };

        const $title = this.createElement('h2');
        $title.textContent = title;

        $modalHeader.append($closeButton, $title);

        const $modalBody = this.createElement('div', 'my-modal-body');
        const $modalText = this.createElement('p');
        $modalText.textContent = message;

        $modalBody.append($modalText);

        $modalContent.append($modalHeader, $modalBody);

        $modal.append($modalContent);

        const app = this.getElement('#app');

        app.prepend($modal);
    }

    // createErrorModal() {
    //     let modalButtonSpan = this.createElement('span');
    //     let modalButton = this.createElement('button', 'close');
    //     let modalTitle = this.createElement('h5', 'modal-title');
    //     let modalHeader = this.createElement('div', 'modal-header');
    //     let modalBody = this.createElement('div', 'modal-body');
    //     let modelContent = this.createElement('div', 'modal-content');
    //     let modalDialog = this.createElement('div', 'modal-dialog', 'modal-sm');
    //     let modal = this.createElement('div', 'modal', 'fade');
    //
    //     modalTitle.id = 'modalLabel';
    //     modalBody.id = 'modalBody';
    //     modal.id = 'modal';
    //
    //     modalButton.dataset.dismiss = 'modal';
    //     modalButton.setAttribute('aria-label', 'Close');
    //     modalButtonSpan.setAttribute('aria-hidden', 'true');
    //     modalButtonSpan.innerText = '&times;';
    //
    //     modal.setAttribute('role', 'dialog');
    //     modal.setAttribute('tabindex', '-1');
    //     modal.setAttribute('aria-labelledby', 'errorModalLabel');
    //     modal.setAttribute('aria-hidden', 'true');
    //
    //     modalDialog.setAttribute('role', 'document');
    //
    //     modal.appendChild(modalDialog);
    //     modalDialog.appendChild(modelContent);
    //     modelContent.appendChild(modalHeader);
    //     modelContent.appendChild(modalBody);
    //     modalHeader.appendChild(modalTitle);
    //     modalHeader.appendChild(modalButton);
    //     modalButton.appendChild(modalButtonSpan);
    //
    //     return modal;
    // }
}

// struct
export class Input {
    name;
    type;
    defaultValue;

    constructor(name, type, defaultValue) {
        this.name = name;
        this.type = type;
        this.defaultValue = defaultValue
    }
}
