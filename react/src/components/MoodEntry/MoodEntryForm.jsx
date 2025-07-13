// src/components/MoodEntry/MoodEntryForm.jsx
import { useState } from 'react';
import styles from './MoodEntryForm.module.css';
import MoodService from '../../services/MoodService';
import Notification from '../Notification/Notification';

export default function MoodEntryForm() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await MoodService.createMood({ mood, note });
      setNotification({ type: 'success', message: 'Mood entry saved successfully!' });
      setMood('');
      setNote('');
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || 'Failed to save mood entry.',
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>How are you feeling today?</h2>

      <Notification notification={notification} clearNotification={() => setNotification(null)} />

      <label>
        Mood:
        <select value={mood} onChange={(e) => setMood(e.target.value)} required>
          <option value="">Select one</option>
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
          <option value="Stressed">Stressed</option>
          <option value="Excited">Excited</option>
        </select>
      </label>

      <label>
        Notes:
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional..."
        />
      </label>

      <button type="submit">Save Entry</button>
    </form>
  );
}
