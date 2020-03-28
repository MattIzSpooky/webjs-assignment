import {BaseView} from './BaseView';

export class UnmanagedProductsView extends BaseView {
    #$unmanagedProductsDropdown;
    #$currentProduct;

    constructor() {
        super();

        this.$root = this.createElement('div');
        const $formGroup = this.createElement('div', 'form-group', 'w-100');

        this.#$unmanagedProductsDropdown = this.createElement('select', 'form-control');
        this.#$unmanagedProductsDropdown.id = 'product';

        const $defaultOption = this.createElement('option');
        $defaultOption.textContent = 'Select a product';
        this.#$unmanagedProductsDropdown.append($defaultOption);

        $formGroup.append(this.#$unmanagedProductsDropdown);

        this.#$currentProduct = this.createElement('div');

        this.$root.append($formGroup, this.#$currentProduct);
    }

    rerenderProductDropdown(products) {
        const dropdown = this.#$unmanagedProductsDropdown;
        const value = dropdown.value;

        while (dropdown.firstChild) {
            dropdown.removeChild(dropdown.firstChild)
        }

        const $defaultOption = this.createElement('option');
        $defaultOption.textContent = 'Select a product';
        dropdown.append($defaultOption);

        for (const product of products) {
            const $option = this.createElement('option');
            $option.value = product.getName();
            $option.textContent = product.getName();
            $option.selected = value === product.getName();

            dropdown.append($option);
        }
    }

    bindDropdownChange(handler) {
        this.#$unmanagedProductsDropdown.onchange = (ev) => {
            ev.preventDefault();
            handler(ev.target.value);
        };
    }

    renderCurrentProduct(product) {
        const $product = this.createElement('div');

        $product.textContent = product.getName();
        $product.id = product.getName();
        $product.draggable = true;
        $product.ondragstart = (ev) => ev.dataTransfer.setData('text', ev.target.id);
        $product.ondragover = (ev) => ev.preventDefault();
        $product.dataset.type = 'product';
        $product.dataset.productName = product.getName();

        this.#$currentProduct.append($product);
    }


    clearCurrentProduct() {
        const $currentProduct = this.#$currentProduct;

        while ($currentProduct.firstChild) {
            $currentProduct.removeChild($currentProduct.firstChild)
        }
    }
}