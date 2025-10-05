export interface CurrentWeather {
  feelsLike: number;
  humidity: number;
  wind: number;
  precipitation: number;
  temperature: number;
  weatherCode: number;
}

export interface HourlyForecastStore {
  time: string[];
  temperature: number[];
  weatherCode: number[];
}

export interface DailyForecastStore {
  time: string[];
  maxTemp: number[];
  minTemp: number[];
  weatherCode: number[];
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
    time: string;
  };
  hourly: HourlyForecast;
  daily: DailyForecast;
}

export interface UserInfo {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
  population?: number;
}
