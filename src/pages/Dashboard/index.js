import React, { useState } from 'react';
import Page from '../../components/Page';
import styles from './styles.module.css';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState(0);

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <Page>
      <h1>Dashboard</h1>
      <form className={styles.form} onSubmit={handleSave}>
        <label>
          URL
          <input
            className={styles.input}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label>
          Target latency (in milliseconds)
          <input
            className={styles.input}
            type="number"
            value={targetLatency}
            onChange={(e) => setTargetLatency(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </Page>
  );
};

export default Dashboard;
