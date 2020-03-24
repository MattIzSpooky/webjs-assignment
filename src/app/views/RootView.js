import {BaseView} from './BaseView';

export class RootView extends BaseView {
    #clothesRegionButton;
    #tierlantineRegionButton;
    #decorationRegionButton;
    #weatherButton;

    constructor() {
        super();

        const app = this.getElement('#app');
        this.$root = this.createElement('div');

        this.#clothesRegionButton = this.createElement('button');
        this.#clothesRegionButton.textContent = 'Kleding';

        this.#tierlantineRegionButton = this.createElement('button');
        this.#tierlantineRegionButton.textContent = 'Tierlantine';

        this.#decorationRegionButton = this.createElement('button');
        this.#decorationRegionButton.textContent = 'Decoraties';

        this.#weatherButton = this.createElement('button');
        this.#weatherButton.textContent = 'Weather';

        this.$root.append(this._createNavbar(this.#clothesRegionButton, this.#tierlantineRegionButton, this.#decorationRegionButton, this.#weatherButton));

        app.append(this.$root);
    }

    _createNavbar(...$routeButtons) {
        const $nav = this.createElement('nav', 'navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light', 'row');

        const $routeToggle = this.createElement('button', 'navbar-toggler');
        $routeToggle.type = 'button';
        $routeToggle.dataset.toggle = 'collapse';
        $routeToggle.dataset.target = '#navbarNavAltMarkup';

        const $toggler = this.createElement('span', 'navbar-toggler-icon');

        $routeToggle.append($toggler);

        const $routesWrapper = this.createElement('div', 'collapse', 'navbar-collapse');
        $routesWrapper.id = 'navbarNavAltMarkup';

        const $routes = this.createElement('div', 'navbar-nav', 'mr-auto');

        for (const $route of $routeButtons) {
            $route.classList.add('nav-item', 'nav-link', 'btn', 'btn-link');

            $routes.append($route);
        }

        $routesWrapper.append($routes);
        $nav.append($routeToggle, $routesWrapper);

        return $nav;
    }

    bindClickClothesButton(handler) {
        this.#clothesRegionButton.onclick = handler;
    }

    bindClickTierlantineButton(handler) {
        this.#tierlantineRegionButton.onclick = handler;
    }

    bindClickDecorationButton(handler) {
        this.#decorationRegionButton.onclick = handler;
    }

    bindClickWeatherButton(handler) {
        this.#weatherButton.onclick = handler;
    }
}