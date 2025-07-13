// src/components/MoodStats/MoodStats.jsx

import styles from './MoodStats.module.css';

export default function MoodStats({ stats = { happy: 2, sad: 1, neutral: 3 } }) {
  const total = Object.values(stats).reduce((acc, val) => acc + val, 0);

  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.title}>Mood Overview</h3>
      <div className={styles.statList}>
        {Object.entries(stats).map(([mood, count]) => (
          <div key={mood} className={styles.statItem}>
            <span className={styles.label}>{mood}</span>
            <span className={styles.value}>{count}</span>
            <div
              className={styles.bar}
              style={{ width: `${(count / total) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
      <p className={styles.total}>Total entries: {total}</p>
    </div>
  );
}
