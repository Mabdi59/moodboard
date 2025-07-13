// src/components/MoodEntry/MoodEntryList.jsx

import styles from './MoodEntryList.module.css';

export default function MoodEntryList({ entries = [] }) {
  if (entries.length === 0) {
    return <p className={styles.empty}>No mood entries found.</p>;
  }

  return (
    <ul className={styles.list}>
      {entries.map((entry) => (
        <li key={entry.entryId} className={styles.entry}>
          <div className={styles.entryTop}>
            <span className={styles.mood}>{entry.mood}</span>
            <span className={styles.date}>
              {new Date(entry.entryDate || entry.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className={styles.note}>{entry.note || 'No notes provided.'}</p>
        </li>
      ))}
    </ul>
  );
}
