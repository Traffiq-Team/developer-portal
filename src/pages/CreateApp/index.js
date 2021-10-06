import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../components/Page';
import saveAppConfiguration from '../../api/saveAppConfiguration';
import Button from '../../components/Button';
import styles from './styles.module.css';

const CreateApp = () => {
  const [appName, setAppName] = useState('');
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveAppConfiguration(appName, {
        url,
        targetLatency,
      });

      history.push('/dashboard');
    } catch (error) {
      console.error('caught this error when fetching app metadata', error);
    }
  };

  return (
    <Page>
      <h1>Create new app</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Application name
          <input
            className={styles.input}
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
          />
        </label>
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
        <Button type="submit">Submit</Button>
      </form>
    </Page>
  );
};

export default CreateApp;
