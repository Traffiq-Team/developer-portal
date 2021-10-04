import React, { useState, useEffect, useContext } from 'react';
import editAppConfiguration from '../../api/editAppConfiguration';
import getAppConfiguration from '../../api/getAppConfiguration';
import Page from '../../components/Page';
import AuthContext from '../../store/AuthProvider';
import { SET_APP_CONFIGURATION } from '../../store/AuthProvider/actions';
import styles from './styles.module.css';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');

  const { authState, authDispatch } = useContext(AuthContext);
  const { appName, appConfiguration } = authState;

  useEffect(() => {
    const fetchAppMetadata = async () => {
      try {
        const { data } = await getAppConfiguration(appName);
        const { url, targetLatency } = data;

        authDispatch({
          type: SET_APP_CONFIGURATION,
          payload: { url, targetLatency },
        });
      } catch (error) {
        console.error('caught this error when fetching app metadata', error);
      }
    };

    fetchAppMetadata();
  }, []);

  useEffect(() => {
    const { url, targetLatency } = appConfiguration;

    if (url) {
      setUrl(url);
    }

    if (targetLatency) {
      setTargetLatency(targetLatency);
    }
  }, [appConfiguration]);

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
