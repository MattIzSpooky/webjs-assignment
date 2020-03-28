import {BaseView, Input} from './BaseView';
import {ColumnBuilder} from '../util/column';

export class BaseWizardView extends BaseView {
    static STEPS = 3;

    currentIndex;
    #buttonClothes;
    #buttonDecoration;
    #buttonTierlantine;

    constructor() {
        super();

        this.currentIndex = 0;
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    setCurrentIndex(value) {
        this.currentIndex = value;
    }

    init() {
        const app = this.getElement('#app');

        const colBuilder = new ColumnBuilder().addType('md');

        const $buttonColumn = this.createColumn(colBuilder.addWidth(12).getResult());
        const $column = this.createColumn(colBuilder.getResult());

        $column.append(this.render());
        $buttonColumn.append(this.renderNavButtons());

        const $row = this.createRow();

        $row.append($buttonColumn, $column);

        this.$root.append($row);
        app.append(this.$root);
    }

    render() {
        throw new Error('render() has to be implemented');
    }

    renderSpecificTab() {
        throw new Error('renderSpecificTabs() has to be implemented');
    }

    renderTabs() {
        const $inputName = this.createInput(new Input('name', 'text'));

        const $inputDescription = this.createInput(new Input('description', 'text'));

        const $firstTab = this.createElement('div', 'tab', 'form-group');
        $firstTab.append($inputName, $inputDescription);

        const $inputPurchasePrice = this.createInput(new Input('purchasePrice', 'number'));
        $inputPurchasePrice.lastChild.min = 0;

        const $inputMinimalStock = this.createInput(new Input('minimalStock', 'number'));
        $inputMinimalStock.lastChild.min = 0;

        const $inputCurrentStock = this.createInput(new Input('currentStock', 'number'));
        $inputCurrentStock.lastChild.min = 0;

        const $inputProfitMargin = this.createInput(new Input('profitMargin', 'number'));

        const $secondTab = this.createElement('div', 'tab', 'form-group');
        $secondTab.append($inputPurchasePrice, $inputMinimalStock, $inputCurrentStock, $inputProfitMargin);

        return [$firstTab, $secondTab];
    }

    renderNavButtons() {
        this.#buttonClothes = this.createElement('button', 'btn', 'btn-primary', 'm-4');
        this.#buttonClothes.textContent = 'Clothes';
        this.#buttonClothes.type = 'button';

        this.#buttonTierlantine = this.createElement('button', 'btn', 'btn-primary', 'm-4');
        this.#buttonTierlantine.textContent = 'Tierlantine';
        this.#buttonTierlantine.type = 'button';

        this.#buttonDecoration = this.createElement('button', 'btn', 'btn-primary', 'm-4');
        this.#buttonDecoration.textContent = 'Decoration';
        this.#buttonDecoration.type = 'button';

        const $div = this.createElement('div');
        $div.style = 'text-align:center';
        $div.append(this.#buttonClothes, this.#buttonDecoration, this.#buttonTierlantine);

        return $div;
    }

    renderButtons() {
        const $prev = this.createElement('button', 'btn', 'btn-default');
        $prev.id = 'prevBtn';
        $prev.textContent = 'Previous';
        $prev.type = 'button';
        $prev.onclick = () => this.nextPrev(-1);

        const $next = this.createElement('button', 'btn', 'btn-default');
        $next.id = 'nextBtn';
        $next.textContent = 'Next';
        $next.type = 'button';
        $next.onclick = () => this.nextPrev(1);

        const $childDiv = this.createElement('div', 'floatButton');
        $childDiv.append($prev, $next);

        const $div = this.createElement('div', 'overflow');
        $div.append($childDiv);

        return $div;
    }

    renderSteps(count) {
        const $div = this.createElement('div', 'circles');

        for (let i = 1; i <= count; i++) {
            $div.append(this.createElement('span', 'step'))
        }

        return $div;
    }

    showTab(number) {
        const $tabs = document.getElementsByClassName('tab');
        if (this.currentIndex !== BaseWizardView.STEPS) $tabs[number].style.display = 'block';

        if (number === 0) {
            document.getElementById('prevBtn').style.display = 'none';
        } else {
            document.getElementById('prevBtn').style.display = 'inline';
        }

        if (number === ($tabs.length - 1)) {
            document.getElementById('nextBtn').innerHTML = 'Submit';
            document.getElementById('nextBtn').type = 'submit';
        } else {
            document.getElementById('nextBtn').innerHTML = 'Next';
            if (number !== 3) document.getElementById('nextBtn').type = 'button';
        }

        this.fixStepIndicator(number)
    }

    fixStepIndicator(number) {
        if (number !== BaseWizardView.STEPS) {
            const $step = document.getElementsByClassName('step');

            for (let i = 0; i < $step.length; i++) {
                $step[i].classList.remove('active');
            }

            $step[number].classList.add('active');
        }
    }

    nextPrev(number) {
        const $tabs = document.getElementsByClassName('tab');

        if (number === 1 && !this.validateForm()) return false;

        if (this.currentIndex < BaseWizardView.STEPS) $tabs[this.currentIndex].style.display = 'none';

        this.currentIndex = this.currentIndex + number;

        this.showTab(this.currentIndex);
    }

    validateForm() {
        // This function deals with validation of the form fields
        let valid = true;

        if (this.currentIndex <= BaseWizardView.STEPS - 1) {
            const $tab = document.getElementsByClassName('tab');
            const $input = $tab[this.currentIndex].getElementsByTagName('input');

            // A loop that checks every input field in the current tab:
            for (let i = 0; i < $input.length; i++) {
                // If a field is empty...
                if ($input[i].value === '') {
                    // add an "invalid" class to the field:
                    $input[i].classList.add('invalid');
                    // and set the current valid status to false
                    valid = false;
                }
            }

            // If the valid status is true, mark the step as finished and valid:
            if (valid) {
                document.getElementsByClassName('step')[this.currentIndex].classList.add('finish');
            }
        }

        return valid;
    }

    bindOnFormSubmit() {
        throw new Error('render() has to be implemented');
    }

    bindTierlantinePageButton(handler) {
        this.#buttonTierlantine.onclick = handler;
    }

    bindClothesPageButton(handler) {
        this.#buttonClothes.onclick = handler;
    }

    bindDecorationPageButton(handler) {
        this.#buttonDecoration.onclick = handler;
    }
}