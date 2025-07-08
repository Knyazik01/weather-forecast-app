import { useState, useEffect } from 'react';
import WeatherForm from './components/WeatherForm/WeatherForm.tsx';
import ForecastDisplay from './components/WeatherDisplay';
import HistoryList from './components/HistoryList';
import Loader from './components/Loader';
import { getForecast } from './apiCall.ts';
import type { ForecastData } from './types/weather';
import Logo from './assets/weather.svg?react';
import styles from './App.module.scss';

function App() {
  const intHistory = () => {
    const stored = localStorage.getItem('searchHistory');

    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  };
  const [history, setHistory] = useState<string[]>(intHistory);

  // Save history changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const recordSearch = (city: string): void => {
    setHistory(prev => {
      const deduped: string[] = [city, ...prev.filter(c => c !== city)];
      return deduped.slice(0, 10); // limit to last 10
    });
  };

  const handleSearch = async (city: string): Promise<void> => {
    setError('');
    setLoading(true);
    setForecast(null);

    try {
      const response = await getForecast({ city });
      setForecast(response.data);
      recordSearch(city);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = (): void => setHistory([]);

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <h1 className={styles.title}>Weather Forecast</h1>
      <WeatherForm onSearch={handleSearch} />
      <HistoryList
        items={history}
        onSelect={handleSearch}
        onRemove={city => setHistory(prev => prev.filter(c => c !== city))}
        onClearAll={clearHistory}
      />
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      {forecast && <ForecastDisplay data={forecast} />}
    </div>
  );
}

export default App;
