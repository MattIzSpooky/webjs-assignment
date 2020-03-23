import {Column} from '../util/column';

export class BaseView {
    $root;

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

    showErrorModal(title, message) {
        alert(title + " : " + message);
    }

    /*createErrorModal() {
        let modalButtonSpan = this.createElement('span');
        let modalButton = this.createElement('button', 'close');
        let modalTitle = this.createElement('h5', 'modal-title');
        let modalHeader = this.createElement('div', 'modal-header');
        let modalBody = this.createElement('div', 'modal-body');
        let modelContent = this.createElement('div', 'modal-content');
        let modalDialog = this.createElement('div', 'modal-dialog', 'modal-sm');
        let modal = this.createElement('div', 'modal', 'fade');

        modalTitle.id = 'modalLabel';
        modalBody.id = 'modalBody';
        modal.id = 'modal';

        modalButton.dataset.dismiss = "modal";
        modalButton.setAttribute('aria-label', 'Close');
        modalButtonSpan.setAttribute('aria-hidden', 'true');
        modalButtonSpan.innerText = '&times;';

        modal.setAttribute('role', 'dialog');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'errorModalLabel');
        modal.setAttribute('aria-hidden', 'true');

        modalDialog.setAttribute('role', 'document');

        modal.appendChild(modalDialog);
        modalDialog.appendChild(modelContent);
        modelContent.appendChild(modalHeader);
        modelContent.appendChild(modalBody);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(modalButton);
        modalButton.appendChild(modalButtonSpan);

        return modal;
    }*/
}
