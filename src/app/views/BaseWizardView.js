import {BaseView} from "./BaseView";
import {ColumnBuilder} from "../util/column";

export class BaseWizardView extends BaseView {
    currentIndex;

    constructor(props) {
        super(props);

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
        const $column = this.createColumn(colBuilder.addWidth(12).getResult());
        $column.append(this.render());

        const $row = this.createRow();

        $row.append($column);

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
        $inputPurchasePrice.min = 0;
        $inputPurchasePrice.type = 'number';
        const $inputMinimalStock = this.createElement('input', 'mb-2');
        $inputMinimalStock.name = 'minimalStock';
        $inputMinimalStock.placeholder = 'minimalStock';
        $inputMinimalStock.min = 0;
        $inputMinimalStock.type = 'number';
        const $inputCurrentStock = this.createElement('input', 'mb-2');
        $inputCurrentStock.name = 'currentStock';
        $inputCurrentStock.placeholder = 'currentStock';
        $inputCurrentStock.min = 0;
        $inputCurrentStock.type = 'number';

        const $secondTab = this.createElement('div', 'tab');
        $secondTab.append($inputPurchasePrice, $inputMinimalStock, $inputCurrentStock);

        return [$firstTab, $secondTab];
    }

    renderButtons() {
        const $prev = this.createElement('button');
        $prev.id = 'prevBtn';
        $prev.textContent = 'Previous';
        $prev.type = 'button';
        $prev.onclick = () => this.nextPrev(-1);

        const $next = this.createElement('button');
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
        const $tabs = document.getElementsByClassName("tab");
        if (this.currentIndex !== 3) $tabs[number].style.display = "block";

        if (number === 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }

        if (number === ($tabs.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
            document.getElementById("nextBtn").type = "submit";
        } else {
            document.getElementById("nextBtn").innerHTML = "Next";
            if (number !== 3) document.getElementById("nextBtn").type = "button";
        }

        this.fixStepIndicator(number)
    }

    fixStepIndicator(number) {
        if (number !== 3) {
            let $step = document.getElementsByClassName("step");

            for (let i = 0; i < $step.length; i++) {
                $step[i].className = $step[i].className.replace(" active", "");
            }

            $step[number].className += " active";
        }
    }

    nextPrev(number) {
        const $tabs = document.getElementsByClassName("tab");

        if (number === 1 && !this.validateForm()) return false;

        if (this.currentIndex < 3) $tabs[this.currentIndex].style.display = "none";

        this.currentIndex = this.currentIndex + number;

        if (this.currentIndex >= $tabs.length) {
            // End of form
        }

        this.showTab(this.currentIndex);
    }

    validateForm() {
        // This function deals with validation of the form fields
        let $tab, $input, valid = true;

        if (this.currentIndex <= 2) {
            $tab = document.getElementsByClassName("tab");
            $input = $tab[this.currentIndex].getElementsByTagName("input");

            // A loop that checks every input field in the current tab:
            for (let i = 0; i < $input.length; i++) {
                // If a field is empty...
                if ($input[i].value === "") {
                    // add an "invalid" class to the field:
                    $input[i].className += " invalid";
                    // and set the current valid status to false
                    valid = false;
                }
            }

            // If the valid status is true, mark the step as finished and valid:
            if (valid) {
                document.getElementsByClassName("step")[this.currentIndex].className += " finish";
            }
        }

        return valid;
    }

    bindOnFormSubmit() {
        throw new Error('render() has to be implemented');
    }
}