import {Weather} from '../models/Weather';
import {WeatherView} from '../views/WeatherView';
import {Controller} from './Controller';

export class WeatherController extends Controller {
    constructor() {
        super();
        this._model = new Weather();
        this._view = new WeatherView();

        this._view.bindOnFormSubmit(this.#onWeatherSearch);
    }

    #onWeatherSearch = async (ev) => {
        ev.preventDefault();

        try {
            const form = new FormData(ev.target);
            const city = form.get('city');

            const data = await this._model.getWeatherForCity(city);
            this._view.renderWeatherInfo(Weather.BASE_URI, data);
        } catch (e) {
            const data = JSON.parse(e.message);
            this.showError(`Server status: ${data.cod}`, data.message);
        }
    };
}