import {BaseView} from "./BaseView";

export class BaseWizardView extends BaseView {
    currentIndex;

    constructor(props) {
        super(props);

        this.currentIndex = 0;
    }

    init() {
        throw new Error('init() has to be implemented');
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

    showTab(index) {
        let $tabs = document.getElementsByClassName("tab");

        $tabs[index].style.display = "block";

        if (index === 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }

        const $next = this.getElement('#nextBtn');

        if (index !== ($tabs.length - 1)) {
            $next.textContent = 'Next';
            $next.type = 'button';
        }

        //... and run a function that will display the correct step indicator:
        this.fixStepIndicator(index)
    }

    fixStepIndicator(number) {
        // This function removes the "active" class of all steps...
        let $step = document.getElementsByClassName("step");

        for (let i = 0; i < $step.length; i++) {
            $step[i].className = $step[i].className.replace(" active", "");
        }
        //... and adds the "active" class on the current step:
        $step[number].className += " active";
    }

    nextPrev(number) {
        // This function will figure out which tab to display
        let $tabs = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (number === 1 && !this.validateForm()) return false;
        // Hide the current tab:
        $tabs[this.currentIndex].style.display = "none";

        // Increase or decrease the current tab by 1:
        this.currentIndex = this.currentIndex + number;

        // if you have reached the end of the form...
        if (this.currentIndex >= $tabs.length) {
            const $next = this.getElement('#nextBtn');
            $next.textContent = 'Submit';
            $next.type = 'submit';
            $next.click();
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab(this.currentIndex);
    }

    validateForm() {
        // This function deals with validation of the form fields
        let $tab, $input, valid = true;

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
        return valid; // return the valid status
    }

    bindOnFormSubmit() {
        throw new Error('render() has to be implemented');
    }
}