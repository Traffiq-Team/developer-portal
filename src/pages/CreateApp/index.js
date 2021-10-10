import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../components/Page';
import saveAppConfiguration from '../../api/saveAppConfiguration';
import Input from '../../components/Input';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import TextArea from '../../components/TextArea';
import styles from './styles.module.css';

const CreateApp = () => {
  const [appName, setAppName] = useState('');
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const [waitingMessage, setWaitingMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    makeDocumentTitle('Create New App');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await saveAppConfiguration(appName, {
        url,
        targetLatency,
      });

      history.push('/dashboard');
    } catch (error) {
      console.error('caught this error when fetching app metadata', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <section className={styles.section}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Create a new app</h1>
          <form className={styles.form}>
            <Input
              type="text"
              placeholder="Application name"
              label="Application name"
              value={appName}
              onChange={(value) => setAppName(value)}
              className={styles.input}
            />
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
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Submit
            </PrimaryButton>
          </form>
        </div>
        <div className={styles.previewContainer}></div>
      </section>
    </Page>
  );
};

export default CreateApp;
