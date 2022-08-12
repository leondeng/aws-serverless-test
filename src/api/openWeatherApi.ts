import { HttpClient } from '../utils';
import { OpenWeatherParameters, OpenWeatherResult } from '../';
import HttpResponse from '../utils/httpResponse';

const getWeather = (
    payload: OpenWeatherParameters,
): Promise<HttpResponse<OpenWeatherResult>> => {
    const httpClient = new HttpClient(
        'https://api.openweathermap.org/data/2.5',
    );

    return httpClient.get('/weather', {
        ...payload,
        appid: process.env.OPEN_WEATHER_MAP_API_KEY,
    });
};

export default {
    getWeather,
};
