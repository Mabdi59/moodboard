// src/components/MoodStats/MoodFilter.jsx

import { useState } from 'react';
import styles from './MoodFilter.module.css';

export default function MoodFilter({ onFilter }) {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ mood: selectedMood, date: selectedDate });
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label htmlFor="mood">Mood:</label>
        <select
          id="mood"
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          <option value="">All</option>
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
          <option value="Stressed">Stressed</option>
          <option value="Excited">Excited</option>
        </select>
      </div>

      <div className={styles.group}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.button}>Filter</button>
    </form>
  );
}
