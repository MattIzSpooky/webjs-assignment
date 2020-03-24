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
        const $info = this.createElement('div', 'card');
        const weather = data.weather[0];
        const main = data.main;
        const wind = data.wind;

        const $infoContent = this.createElement('div', 'card-body');

        const $weatherImage = this.createElement('img');
        $weatherImage.src = `${baseUri}/img/w/${weather.icon}.png`;
        $weatherImage.alt = weather.description;

        const $title = this.createElement('div', 'card-header', 'bg-info', 'text-white');
        $title.textContent = data.name;

        $title.append($weatherImage);

        const $weatherInfo = this.createElement('p', 'card-text');

        const $weatherText = this.createElement('div');
        $weatherText.innerText = weather.description;

        $weatherInfo.append($weatherText);

        const $tempCurrent = this.createElement('p', 'card-text');
        $tempCurrent.textContent = `current: ${main.temp}°C`;

        const $tempMin = this.createElement('p', 'card-text');
        $tempMin.textContent = `min temprature: ${main.temp_min}°C`;

        const $tempMax = this.createElement('p', 'card-text');
        $tempMin.textContent = `max temprature: ${main.temp_max}°C`;

        const $humidity = this.createElement('p', 'card-text');
        $humidity.textContent = `humidity: ${main.humidity}%`;

        const $windInfo = this.createElement('p', 'card-text');
        $windInfo.textContent = `Wind speed: ${wind.speed} m/s`;

        $infoContent.append($weatherInfo, $tempCurrent, $tempMin, $tempMax, $humidity, $windInfo);
        $info.append($title, $infoContent);

        if (this.#$weatherInfo) {
            this.#$weatherInfo.remove();
        }

        this.#$weatherInfo = $info;
        this.$root.append($info);
    }
}