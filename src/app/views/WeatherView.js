import {BaseView, Input} from './BaseView';

export class WeatherView extends BaseView {
    #$form;
    #$weatherInfo;

    constructor() {
        super();

        const app = this.getElement('#app');

        this.#$form = this.createForm(new Input('city', 'text'));

        this.$root.append(this.#$form);

        app.append(this.$root);
    }

    bindOnFormSubmit(handler) {
        this.#$form.onsubmit = handler;
    }

    renderWeatherInfo(baseUri, data) {
        const weather = data.weather[0];
        const main = data.main;
        const wind = data.wind;

        const $weatherImage = this.createElement('img');
        $weatherImage.src = `${baseUri}/img/w/${weather.icon}.png`;
        $weatherImage.alt = weather.description;

        const $title = this.createElement('div', 'card-header', 'bg-info', 'text-white');
        $title.textContent = data.name;

        $title.append($weatherImage);

        const $card = this.createCard($title,
            weather.description,
            `current: ${main.temp}°C`,
            `min temprature: ${main.temp_min}°C`,
            `max temprature: ${main.temp_max}°C`,
            `humidity: ${main.humidity}%`,
            `Wind speed: ${wind.speed} m/s`
        );

        if (this.#$weatherInfo) {
            this.#$weatherInfo.remove();
        }

        this.#$weatherInfo = $card;
        this.$root.append($card);
    }
}