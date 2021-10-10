import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import editAppConfiguration from '../../api/editAppConfiguration';
import getAppConfiguration from '../../api/getAppConfiguration';
import Page from '../../components/Page';
import Input from '../../components/Input';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import getSpecialMessage from '../../api/getSpecialMessage';
import saveSpecialMessage from '../../api/saveSpecialMessage';
import TextArea from '../../components/TextArea';
import styles from './styles.module.css';

const EditApp = () => {
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const [waitingMessage, setWaitingMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const history = useHistory();
  const { appName } = useParams();

  useEffect(() => {
    makeDocumentTitle(`${appName} Configurations`);
  }, []);

  useEffect(() => {
    const fetchAppMetadata = async () => {
      try {
        const [appConfigurationData, specialMessageData] = await Promise.all([
          getAppConfiguration(appName),
          getSpecialMessage(appName),
        ]);

        const { url, targetLatency } = appConfigurationData;
        const message = specialMessageData;

        setUrl(url);
        setTargetLatency(targetLatency);
        setWaitingMessage(message);
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
      await editAppConfiguration(appName, {
        url,
        targetLatency,
      });
      await saveSpecialMessage(appName, { message: waitingMessage });
      history.push('/dashboard');
    } catch (error) {
      console.error('caught this error when fetching app metadata', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Page>
      <section className={styles.section}>
        <div className={styles.formContainer}>
          <h1
            className={styles.title}
          >{`Edit app configurations for "${appName}"`}</h1>
          <form className={styles.form}>
            <Input
              type="text"
              placeholder="URL"
              label="URL"
              value={url}
              onChange={(value) => setUrl(value)}
              className={styles.input}
            />
            <Input
              type="number"
              placeholder="Target latency (in milliseconds)"
              label="Target latency (in milliseconds)"
              value={targetLatency}
              onChange={(value) => setTargetLatency(value)}
              className={styles.input}
            />
            <TextArea
              placeholder="Special waiting message"
              label="Special waiting message"
              value={waitingMessage}
              onChange={(value) => setWaitingMessage(value)}
              className={styles.textArea}
            />
            <PrimaryButton
              size="large"
              onClick={handleSave}
              isLoading={isSaving}
            >
              Save
            </PrimaryButton>
          </form>
        </div>
        <div className={styles.previewContainer} />
      </section>
    </Page>
  );
};

export default EditApp;
