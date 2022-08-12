import { APIGatewayProxyResult } from 'aws-lambda';
import { HttpException, WeatherResultPayload } from '../';

export const okResponse = (
    responseObject: WeatherResultPayload,
): APIGatewayProxyResult => ({
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(responseObject),
});

export const errorResponse = (err: HttpException): APIGatewayProxyResult => ({
    body: err?.message || 'Hmmm, something went weird...',
    statusCode: err?.statusCode || 500,
});

export const badRequestResponse = (error: string): APIGatewayProxyResult => ({
    body: JSON.stringify({
        error,
    }),
    statusCode: 400,
});
