import {BaseWizardView} from "./BaseWizardView";

export class DecorationWizardView extends BaseWizardView {
    #$form;

    constructor(props) {
        super(props);

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
        const $inputColor = this.createElement('input', 'mb-2');
        $inputColor.name = 'color';
        $inputColor.placeholder = 'color';
        $inputColor.type = 'color';

        const $inputSize = this.createElement('input', 'mb-2');
        $inputSize.name = 'size';
        $inputSize.placeholder = 'size';
        $inputSize.type = 'number';

        const $inputPackageCount = this.createElement('input', 'mb-2');
        $inputPackageCount.name = 'packageCount';
        $inputPackageCount.placeholder = 'packageCount';
        $inputPackageCount.type = 'number';

        const $decorationType = this.createElement('input');
        $decorationType.name = 'type';
        $decorationType.value = 'decoration';
        $decorationType.type = 'hidden';

        const $div = this.createElement('div', 'tab');
        $div.append($inputColor, $inputSize, $inputPackageCount, $decorationType);

        return $div;
    }

    bindOnFormSubmit(handler) {
        this.#$form.onsubmit = handler;
    }
}