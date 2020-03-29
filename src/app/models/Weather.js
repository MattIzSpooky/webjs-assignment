export class Weather {
    static #API_KEY = '042f1e705a47526b00a70ce5439dc689';

    static BASE_URI = 'https://api.openweathermap.org';

    async getWeatherForCity(city) {
        const response = await fetch(`${Weather.BASE_URI}/data/2.5/weather?q=${city}&units=metric&appid=${Weather.#API_KEY}`);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return  await response.json();
    }
}