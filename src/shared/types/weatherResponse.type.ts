export interface IWeatherResponse {
    current: {
        temp: number,
        feels_like: number,
        humidity: number,
        clouds: number,
        visibility: number,
        wind_speed: number,
    };
}