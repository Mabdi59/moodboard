// src/views/HomeView/HomeView.jsx

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import styles from './HomeView.module.css';

export default function HomeView() {
  const user = useContext(UserContext);
  const moodCount = 0; 

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>
        Welcome back, {user?.username || 'Guest'}!
      </h1>

      <p className={styles.subtext}>
        Your mood matters. Start tracking it now.
      </p>

      <Link to="/mood" className={styles.newEntryButton}>
        + New Mood Entry
      </Link>

      <section className={styles.statsCard}>
        <h3>This Week</h3>
        <p className={moodCount === 0 ? styles.emptyState : ''}>
          You’ve logged <strong>{moodCount}</strong> mood {moodCount === 1 ? 'entry' : 'entries'}.
        </p>
      </section>
    </div>
  );
}
