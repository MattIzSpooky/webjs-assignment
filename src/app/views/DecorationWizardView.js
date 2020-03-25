import {ColumnBuilder} from "../util/column";
import {BaseWizardView} from "./BaseWizardView";

export class DecorationWizardView extends BaseWizardView {
    constructor(props) {
        super(props);

        const app = this.getElement('#app');

        const colBuilder = new ColumnBuilder().addType('md');
        const $column = this.createColumn(colBuilder.addWidth(12).getResult());
        $column.append(this.render());

        const $row = this.createRow();

        $row.append($column);

        this.$root.append($row);
        app.append(this.$root);
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

        return $wizard.append($header, $defaultTabs, $specificTab, $buttons, $steps)
    }

    renderSpecificTab() {
        const $inputColor = this.createElement('input', 'mb-2');
        $inputColor.name = 'color';
        $inputColor.placeholder = 'color';

        const $inputSize = this.createElement('input', 'mb-2');
        $inputSize.name = 'size';
        $inputSize.placeholder = 'size';

        const $inputPackageCount = this.createElement('input', 'mb-2');
        $inputPackageCount.name = 'packageCount';
        $inputPackageCount.placeholder = 'packageCount';

        return this.createElement('div', 'tab').append($inputColor, $inputSize, $inputPackageCount);
    }
}