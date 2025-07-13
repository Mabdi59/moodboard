// src/views/MoodEntryView/MoodEntryView.jsx

import { useState } from 'react';
import MoodEntryForm from '../../components/MoodEntry/MoodEntryForm';
import Notification from '../../components/Notification/Notification';
import MoodService from '../../services/MoodService';

import styles from './MoodEntryView.module.css';

export default function MoodEntryView() {
  const [notification, setNotification] = useState(null);

  const handleSubmit = (entryData) => {
    MoodService.createMood(entryData)
      .then(() => {
        setNotification({ type: 'success', message: 'Mood entry saved successfully!' });
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Failed to save mood entry.';
        setNotification({ type: 'error', message });
      });
  };

  return (
    <div className={styles.moodEntryView}>
      <h1>Log a New Mood</h1>

      <Notification
        notification={notification}
        clearNotification={() => setNotification(null)}
      />

      <MoodEntryForm onSubmit={handleSubmit} />
    </div>
  );
}
