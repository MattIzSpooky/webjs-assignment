import {BaseView} from "./BaseView";

export class BaseWizardView extends BaseView {
    constructor(props) {
        super(props);
    }

    render() {
        throw new Error('render() has to be implemented');
    }

    renderSpecificTabs() {
        throw new Error('renderSpecificTabs() has to be implemented');
    }

    renderTabs() {
        const $inputName = this.createElement('input', 'mb-2');
        $inputName.name = 'name';
        $inputName.placeholder = 'name';
        const $inputDescription = this.createElement('input', 'mb-2');
        $inputDescription.name = 'description';
        $inputDescription.placeholder = 'description';

        const $firstTab = this.createElement('div', 'tab');
        $firstTab.append($inputName, $inputDescription);

        const $inputPurchasePrice = this.createElement('input', 'mb-2');
        $inputPurchasePrice.name = 'purchasePrice';
        $inputPurchasePrice.placeholder = 'purchasePrice';
        const $inputMinimalStock = this.createElement('input', 'mb-2');
        $inputMinimalStock.name = 'minimalStock';
        $inputMinimalStock.placeholder = 'minimalStock';
        const $inputCurrentStock = this.createElement('input', 'mb-2');
        $inputCurrentStock.name = 'currentStock';
        $inputCurrentStock.placeholder = 'currentStock';

        const $secondTab = this.createElement('div', 'tab');
        $secondTab.append($inputPurchasePrice, $inputMinimalStock, $inputCurrentStock);

        return [$firstTab, $secondTab];
    }

    renderButtons() {
        const $prevButton = this.createElement('button');
        $prevButton.id = 'prevBtn';
        $prevButton.textContent = 'Previous';
        const $nextButton = this.createElement('button');
        $nextButton.id = 'nextBtn';
        $nextButton.textContent = 'Next';

        const $childDiv = this.createElement('div');
        $childDiv.append($prevButton, $nextButton);

        return this.createElement('div').append($childDiv);
    }

    renderSteps(count) {
        const $div = this.createElement('div', 'circles');
        const $prevButton = this.createElement('span', 'step');

        for (let i = 0; i <= count; i++) {
            $div.append($prevButton)
        }

        return $div;
    }
}