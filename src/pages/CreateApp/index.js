import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../components/Page';
import saveAppConfiguration from '../../api/saveAppConfiguration';
import Button from '../../components/Button';
import Input from '../../components/Input';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import styles from './styles.module.css';

const CreateApp = () => {
  const [appName, setAppName] = useState('');
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const history = useHistory();

  useEffect(() => {
    makeDocumentTitle('Create New App');
  }, []);

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
        <Input
          type="text"
          placeholder="Application name"
          label="Application name"
          value={appName}
          onChange={(value) => setAppName(value)}
        />
        <Input
          type="text"
          placeholder="URL"
          label="URL"
          value={url}
          onChange={(value) => setUrl(value)}
        />
        <Input
          type="number"
          placeholder="Target latency (in milliseconds)"
          label="Target latency (in milliseconds)"
          value={targetLatency}
          onChange={(value) => setTargetLatency(value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Page>
  );
};

export default CreateApp;
