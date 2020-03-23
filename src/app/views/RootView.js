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
        const $nav = this.createElement('nav');
        $nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light', 'row');

        const $routeToggle = this.createElement('button');
        $routeToggle.classList.add('navbar-toggler');
        $routeToggle.type = 'button';
        $routeToggle.dataset.toggle = 'collapse';
        $routeToggle.dataset.target = '#navbarNavAltMarkup';

        const $toggler = this.createElement('span');
        $toggler.classList.add('navbar-toggler-icon');

        $routeToggle.append($toggler);

        const $routesWrapper = this.createElement('div');
        $routesWrapper.classList.add('collapse', 'navbar-collapse');
        $routesWrapper.id = 'navbarNavAltMarkup';

        const $routes = this.createElement('div');
        $routes.classList.add('navbar-nav', 'mr-auto');

        for (const $route of $routeButtons) {
            $route.classList.add('nav-item', 'nav-link', 'btn', 'btn-link');

            $routes.append($route);
        }

        $routesWrapper.append($routes);
        $nav.append($routeToggle, $routesWrapper);

        return $nav;
    }

    bindClickClothesButton(handler) {
        this.#clothesRegionButton.addEventListener('click', () => handler())
    }

    bindClickTierlantineButton(handler) {
        this.#tierlantineRegionButton.addEventListener('click', () => handler())
    }

    bindClickDecorationButton(handler) {
        this.#decorationRegionButton.addEventListener('click', () => handler())
    }

    bindClickWeatherButton(handler) {
        this.#weatherButton.addEventListener('click', () => handler())
    }
}