import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import saveAppConfiguration from '../../api/saveAppConfiguration';
import getAppConfiguration from '../../api/getAppConfiguration';
import Page from '../../components/Page';
import Button from '../../components/Button';
import styles from './styles.module.css';

const Configuration = () => {
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
      await saveAppConfiguration(appName, {
        url,
        targetLatency,
      });
    } catch (error) {
      console.error('caught this error when fetching app metadata', error);
    }
  };

  return (
    <Page>
      <h1>{appName} Configurations</h1>
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
        <Button type="submit">Save</Button>
      </form>
    </Page>
  );
};

export default Configuration;
