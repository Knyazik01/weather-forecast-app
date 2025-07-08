import { useState, type FormEvent } from 'react';
import styles from './WeatherForm.module.scss';

interface Props {
  onSearch: (city: string) => void;
}

export default function WeatherForm({ onSearch }: Props) {
  const [city, setCity] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
