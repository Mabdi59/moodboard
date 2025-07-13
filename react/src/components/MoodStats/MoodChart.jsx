// src/components/MoodStats/MoodChart.jsx

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import styles from './MoodChart.module.css';

export default function MoodChart({ data = [] }) {
  if (data.length === 0) {
    return <p className={styles.empty}>No mood data available for charting.</p>;
  }

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.title}>Mood Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="moodValue" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
