import { getWeather } from '../services';
import { okResponse, badRequestResponse, errorResponse } from './return';

export const myHandler = async (request) => {
    // this is my code, this is my destiny\

    try {
        const { queryStringParameters: params } = request;

        if (!params || !params?.postcode || !params?.country_code) {
            return badRequestResponse(
                'Parameters postcode and country_code are required.',
            );
        }

        const { postcode, country_code } = params;

        if (isNaN(postcode)) {
            return badRequestResponse('Parameter postcode is invalid.');
        }

        // TODO: validate country code?

        const ret = await getWeather({
            postcode,
            country_code,
        });

        return okResponse(ret);
    } catch (err) {
        return errorResponse(err);
    }
};

export const handler = myHandler;
