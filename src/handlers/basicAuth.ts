import {
    Context,
    APIGatewayAuthorizerHandler,
    APIGatewayRequestAuthorizerEvent,
    APIGatewayAuthorizerResult,
    APIGatewayAuthorizerCallback,
} from 'aws-lambda';

export const handler: APIGatewayAuthorizerHandler = (
    event: APIGatewayRequestAuthorizerEvent,
    context: Context,
    callback: APIGatewayAuthorizerCallback,
) => {
    const authorizationHeader = event.headers?.Authorization;

    if (!authorizationHeader) {
        return callback('Unauthorized');
    }

    const encodedCredentials = authorizationHeader.split(' ')[1];
    const plainCredentials = Buffer.from(encodedCredentials, 'base64')
        .toString()
        .split(':');
    const username = plainCredentials[0];
    const password = plainCredentials[1];

    if (!(username === 'admin' && password === 'secret')) {
        return callback('Unauthorized');
    }

    const authResponse: APIGatewayAuthorizerResult = buildAllowAllPolicy(
        event,
        username,
    );

    callback(null, authResponse);
};

const buildAllowAllPolicy = (
    event: APIGatewayRequestAuthorizerEvent,
    principalId: string,
): APIGatewayAuthorizerResult => {
    const tmp = event.methodArn.split(':');
    const apiGatewayArnTmp = tmp[5].split('/');
    const awsAccountId = tmp[4];
    const awsRegion = tmp[3];
    const restApiId = apiGatewayArnTmp[0];
    const stage = apiGatewayArnTmp[1];
    const apiArn =
        'arn:aws:execute-api:' +
        awsRegion +
        ':' +
        awsAccountId +
        ':' +
        restApiId +
        '/' +
        stage +
        '/*/*';
    console.log('********' + apiArn);

    const policy = {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: [apiArn],
                },
            ],
        }
    };

    return policy;
};
