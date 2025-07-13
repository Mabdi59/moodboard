// src/components/MoodEntry/MoodEntryCard.jsx

import styles from './MoodEntryCard.module.css';

export default function MoodEntryCard({ entry }) {
  if (!entry) return null;

  const formattedDate = new Date(entry.entryDate || entry.createdAt).toLocaleDateString();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.mood}>{entry.mood}</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <p className={styles.note}>
        {entry.note ? entry.note : <em>No notes provided.</em>}
      </p>
    </div>
  );
}
