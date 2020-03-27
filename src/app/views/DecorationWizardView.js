import {BaseWizardView} from "./BaseWizardView";
import {Input} from "./BaseView";

export class DecorationWizardView extends BaseWizardView {
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
        $header.textContent = 'Decoration';

        const $defaultTabs = this.renderTabs();
        const $specificTab = this.renderSpecificTab();
        const $buttons = this.renderButtons();
        const $steps = this.renderSteps(3);

        $wizard.append($header, $defaultTabs[0], $defaultTabs[1], $specificTab, $buttons, $steps);

        return $wizard;
    }

    renderSpecificTab() {
        const $inputColor = this.createInput(new Input('color', 'color'));

        const $inputSize = this.createInput(new Input('size', 'number'));
        $inputSize.lastChild.min = 0;

        const $inputPackageCount = this.createInput(new Input('packageCount', 'number'));
        $inputPackageCount.lastChild.min = 0;

        const $decorationType = this.createElement('input');
        $decorationType.name = 'type';
        $decorationType.value = 'decoration';
        $decorationType.type = 'hidden';

        const $div = this.createElement('div', 'tab', 'form-group');
        $div.append($inputColor, $inputSize, $inputPackageCount, $decorationType);

        return $div;
    }

    bindOnFormSubmit(handler) {
        this.#$form.onsubmit = handler;
    }
}