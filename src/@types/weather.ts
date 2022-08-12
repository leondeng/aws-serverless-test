export type WeatherRequestPayload = {
    postcode: number;
    country_code: string;
};

export type WeatherResultPayload = {
    lon: number;
    lat: number;
    main: string;
    description: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
};

export type OpenWeatherParameters = {
    zip: string;
};

type WeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type OpenWeatherResult = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: WeatherItem[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
};
