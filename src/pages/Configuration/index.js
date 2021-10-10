import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import saveAppConfiguration from '../../api/saveAppConfiguration';
import getAppConfiguration from '../../api/getAppConfiguration';
import Page from '../../components/Page';
import Input from '../../components/Input';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './styles.module.css';

const Configuration = () => {
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { appName } = useParams();

  useEffect(() => {
    makeDocumentTitle(`${appName} Configurations`);
  }, []);

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

    setIsSaving(true);

    try {
      console.log('saving', appName, url, targetLatency);
      await saveAppConfiguration(appName, {
        url,
        targetLatency,
      });
    } catch (error) {
      console.error('caught this error when fetching app metadata', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Page>
      <h1>{appName} Configurations</h1>
      <form className={styles.form} onSubmit={handleSave}>
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
      </form>
      <div className={styles.actions}>
        <PrimaryButton size="large" onClick={handleSave} isLoading={isSaving}>
          Save
        </PrimaryButton>
      </div>
    </Page>
  );
};

export default Configuration;
