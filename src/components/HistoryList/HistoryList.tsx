import styles from './HistoryList.module.scss';

interface Props {
  items: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
  onClearAll: () => void;
}

export default function HistoryList({ items, onSelect, onRemove, onClearAll }: Props) {
  if (!items.length) return null;

  return (
    <div className={styles.history}>
      <div className={styles.header}>
        <h3>Search History</h3>
        <button
          className={styles.clearAllButton}
          onClick={onClearAll}
        >
          Clear All
        </button>
      </div>
      <ul className={styles.list}>
        {items.map(city => (
          <button
            type='button'
            onClick={() => onSelect(city)}
            key={city} className={styles.item}
          >
            <span
              className={styles.cityButton}
            >
              {city}
            </span>
            <button
              type='button'
              className={styles.removeButton}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(city);
              }}
            >
              ×
            </button>
          </button>
        ))}
      </ul>
    </div>
  );
}
