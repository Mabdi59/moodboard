import { useEffect, useState } from 'react';
import MoodEntryList from '../../components/MoodEntry/MoodEntryList';
import MoodService from '../../services/MoodService';
import styles from './MoodHistoryView.module.css';

export default function MoodHistoryView() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    MoodService.getAllMoods()
      .then(response => setEntries(response.data)) 
      .catch(err => {
        console.error('Error fetching mood history:', err);
      });
  }, []);

  return (
    <div className={styles.moodHistory}>
      <h1>Your Mood History</h1>
      <MoodEntryList entries={entries} />
    </div>
  );
}
