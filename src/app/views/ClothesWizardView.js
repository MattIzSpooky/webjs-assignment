import {BaseWizardView} from "./BaseWizardView";
import {Input} from "./BaseView";

export class ClothesWizardView extends BaseWizardView {
    #$form;

    constructor() {
        super();

        this.init();

        this.#$form = this.getElement('#wizard');

        this.showTab(this.currentIndex);
    }

    render() {
        const $wizard = this.createElement('form');
        $wizard.id = 'wizard';

        const $header = this.createElement('h2');
        $header.textContent = 'Clothes';

        const $defaultTabs = this.renderTabs();
        const $specificTab = this.renderSpecificTab();
        const $buttons = this.renderButtons();
        const $steps = this.renderSteps(3);

        $wizard.append($header, $defaultTabs[0], $defaultTabs[1], $specificTab, $buttons, $steps);

        return $wizard;
    }

    renderSpecificTab() {
        const $inputClothesColor = this.createInput(new Input('color', 'color'));

        const $inputClothesSize = this.createInput(new Input('size', 'number'));
        $inputClothesSize.lastChild.min = 0;

        const $clothesType = this.createElement('input');
        $clothesType.name = 'type';
        $clothesType.value = 'clothes';
        $clothesType.type = 'hidden';

        const $div = this.createElement('div', 'tab', 'form-group');
        $div.append($inputClothesColor, $inputClothesSize, $clothesType);

        return $div;
    }

    bindOnFormSubmit(handler) {
        this.#$form.onsubmit = handler;
    }
}