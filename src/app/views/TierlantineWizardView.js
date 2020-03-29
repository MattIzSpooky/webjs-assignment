import {BaseWizardView} from "./BaseWizardView";
import {Input} from "./BaseView";

export class TierlantineWizardView extends BaseWizardView {
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
        $header.textContent = 'Tierlantine';

        const $defaultTabs = this.renderTabs();
        const $specificTab = this.renderSpecificTab();
        const $buttons = this.renderButtons();
        const $steps = this.renderSteps(3);

        $wizard.append($header, ...$defaultTabs, $specificTab, $buttons, $steps);

        return $wizard;
    }

    renderSpecificTab() {
        const $inputWeight = this.createInput(new Input('weight', 'number'));
        $inputWeight.lastChild.min = 0;

        const $tierlantineType = this.createElement('input', 'form-control', 'mb-2');
        $tierlantineType.name = 'type';
        $tierlantineType.value = 'tierlantine';
        $tierlantineType.type = 'hidden';

        const $div = this.createElement('div', 'tab', 'form-group');
        $div.append($inputWeight, $tierlantineType);

        return $div;
    }

    bindOnFormSubmit(handler) {
        this.#$form.onsubmit = handler;
    }
}