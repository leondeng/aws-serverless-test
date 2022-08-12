# Solution Highlights
- serverless framework based, so the developer (me) could focus on main biz logic
- serverless offline enabled, so no real deployment is needed for development
- decouple handler (controller), service and 3rd party api, so it's easy to switch to another 3rd party weather info provider, without too many changes, we even can configure it to use different provider via parameter or some such
- Postman TDD, and after TDD finished, export the testing collection, then we have an API tests set thanks to newman, the testing tool from postman
- use Api Key for basic security, tried Basic Auth Authorizer in another branch, however, something wrong that it always returns 403 in offline mode, will try to figure it out when I have time

# Local run
## Local CA setup
To enable the https for local dev
- install [mkcert](https://github.com/FiloSottile/mkcert)
```
$brew install mkcert
```
- install rootCA
```
$mkcert -install -cert-file dev-certs/cert.pem -key-file dev-certs/key.pem localhost 127.0.0.1 ::1
```
## Start for development
- install dependencies
```
$yarn install
```
- .env
```
OPEN_WEATHER_MAP_API_KEY=%your open weather map api key here%
API_KEY=dev_api_key
```
- start local service
```
$yarn start:dev
```
- postman compose requests collection, send and check
- or just in console with curl
```
$curl -H 'x-api-key:dev_api_key'  'https://localhost:4000/dev/weather?postcode=2000&country_code=au'
```
## Testing Apis
```
$yarn test:api
```
