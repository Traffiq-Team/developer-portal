import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import editAppConfiguration from '../../api/editAppConfiguration';
import getAppConfiguration from '../../api/getAppConfiguration';
import Page from '../../components/Page';
import styles from './styles.module.css';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');

  const { appName } = useParams();

  useEffect(() => {
    const fetchAppMetadata = async () => {
      try {
        const { data } = await getAppConfiguration(appName);
        const { url, targetLatency } = data;

        setUrl(url);
        setTargetLatency(targetLatency);
      } catch (error) {
        console.error('caught this error when fetching app metadata', error);
      }
    };

    fetchAppMetadata();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const { data } = await editAppConfiguration(appName, {
        url,
        targetLatency,
      });
      console.log('got this data from editAppConfiguration', data);
    } catch (error) {
      console.error('caught this error when fetching app metadata', error);
    }
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
