// src/views/MoodStatsView/MoodStatsView.jsx

import { useEffect, useState } from 'react';
import MoodChart from '../../components/MoodStats/MoodChart';
import MoodStats from '../../components/MoodStats/MoodStats';
import MoodFilter from '../../components/MoodStats/MoodFilter';
import MoodService from '../../services/MoodService';

import styles from './MoodStatsView.module.css';

export default function MoodStatsView() {
  const [entries, setEntries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    MoodService.getAllMoods()
      .then((response) => {
        const data = response.data || response; // for mock/fetch fallback
        setEntries(data);
        setFilteredData(data);
        updateStats(data);
      })
      .catch((err) => {
        console.error('Error loading mood entries:', err);
      });
  }, []);

  const updateStats = (data) => {
    const summary = data.reduce((acc, entry) => {
      const mood = entry.mood;
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    setStats(summary);
  };

  const handleFilter = ({ mood, date }) => {
    let filtered = [...entries];

    if (mood) {
      filtered = filtered.filter((entry) => entry.mood === mood);
    }

    if (date) {
      filtered = filtered.filter((entry) =>
        new Date(entry.entryDate || entry.createdAt).toISOString().startsWith(date)
      );
    }

    setFilteredData(filtered);
    updateStats(filtered);
  };

  // Transform for chart
  const chartData = filteredData.map((entry) => ({
    date: new Date(entry.entryDate || entry.createdAt).toLocaleDateString(),
    moodValue: moodToValue(entry.mood),
  }));

  function moodToValue(mood) {
    switch (mood) {
      case 'Happy':
        return 5;
      case 'Excited':
        return 4;
      case 'Neutral':
        return 3;
      case 'Stressed':
        return 2;
      case 'Sad':
        return 1;
      default:
        return 0;
    }
  }

  return (
    <div className={styles.statsView}>
      <h1>Mood Insights</h1>
      <MoodFilter onFilter={handleFilter} />
      <MoodStats stats={stats} />
      <MoodChart data={chartData} />
    </div>
  );
}
