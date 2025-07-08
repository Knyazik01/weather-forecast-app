import { parseISO, format } from 'date-fns';
import type { ForecastData, ForecastDay } from '../../types/weather';
import styles from './WeatherDisplay.module.scss';

interface Props {
  data: ForecastData;
}

const DisplayDay = ({ day }: { day: ForecastDay }) => {
  const formattedDate: string = format(parseISO(day.date), 'EEE, MMM d');

  const iconUrl: string = `https:${day.day.condition.icon}`;
  return (
    <div key={day.date} className={styles.forecastDay}>
      <h4>{formattedDate}</h4>
      <img src={iconUrl} alt={day.day.condition.text} />
      <p>{day.day.condition.text}</p>
      <p>
        {Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°
      </p>
    </div>
  );
};

export default function WeatherDisplay({ data }: Props) {
  const {
    location: { name, region, country },
    current: { temp_c, feelslike_c, humidity, wind_kph, condition },
    forecast: { forecastday },
  } = data;

  return (
    <>
      <div className={styles.current}>
        <img src={`https:${condition.icon}`} alt={condition.text} />
        <div className={styles.details}>
          <h2>
            {name}, {region}, {country}
          </h2>
          <p className={styles.temperature}>{Math.round(temp_c)}°C</p>
          <p>Feels like {Math.round(feelslike_c)}°C</p>
          <p>{condition.text}</p>
          <p>Humidity: {humidity}%</p>
          <p>Wind: {wind_kph}kph</p>
        </div>
      </div>

      <h3>5-Day Forecast</h3>
      <div className={styles.forecast}>
        {
          forecastday.map(day => (
            <DisplayDay
              key={day.date}
              day={day}
            />
          ))
        }
      </div>
    </>
  );
}
