import axios from 'axios';
import type { ForecastData } from './types/weather.ts';

export const getForecast = async ({ city, days = 5} : {city: string, days?: number}) => {
  const url = `${import.meta.env.VITE_WEATHER_API_URL}/forecast.json`;

  return (
    axios.get<ForecastData>(url, {
      params: {
        key: import.meta.env.VITE_WEATHER_API_KEY,
        q: city,
        days,
      },
    })
  );
};