import { openWeatherApi } from '../api';
import { HttpException } from '../utils';
import { WeatherRequestPayload, WeatherResultPayload } from '../';

export const getWeather = async (
    payload: WeatherRequestPayload,
): Promise<WeatherResultPayload> => {
    console.log(payload);

    try {
        const { postcode, country_code } = payload;
        const {
            data: {
                coord: { lon, lat },
                weather,
                main,
            },
        } = await openWeatherApi.getWeather({
            zip: `${postcode},${country_code}`,
        });

        const firstWeather = weather.length > 0 ? weather[0] : null;

        return {
            lon,
            lat,
            main: firstWeather?.main,
            description: firstWeather?.description,
            ...main,
        };
    } catch (err) {
        console.error(err);

        throw new HttpException(
            'Sorry, something wrong with open weather api call',
            500,
        );
    }
};
