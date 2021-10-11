import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { toaster } from 'evergreen-ui';
import Page from '../../components/Page';
import createAppConfiguration from '../../api/createAppConfiguration';
import Input from '../../components/Input';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import TextArea from '../../components/TextArea';
import saveSpecialMessage from '../../api/saveSpecialMessage';
import QueuePreview from '../../components/QueuePreview';
import isValidSubdomain from '../../common/utils/isValidSubdomain';
import styles from './styles.module.css';

const CreateApp = () => {
  const [appName, setAppName] = useState('');
  const [url, setUrl] = useState('');
  const [queueSubdomain, setQueueSubdomain] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const [waitingMessage, setWaitingMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const canSubmit = useMemo(
    () => appName && url && targetLatency,
    [appName, url, targetLatency],
  );

  useEffect(() => {
    makeDocumentTitle('Create New App');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      toaster.danger('One or more required input fields are missing values.');
      return;
    }

    if (!isValidSubdomain(queueSubdomain)) {
      toaster.danger('Subdomain is invalid, please try using something else.');
      return;
    }

    setIsSubmitting(true);

    try {
      // App must be created first BEFORE creating the waiting message
      await createAppConfiguration(appName, {
        url,
        targetLatency: parseFloat(targetLatency),
      });
      await saveSpecialMessage(appName, { message: waitingMessage });

      history.push('/dashboard');
    } catch (error) {
      toaster.danger(error.message);
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
              required
            />
            <Input
              type="text"
              placeholder="Queue subdomain"
              label="Queue Subdomain"
              value={url}
              onChange={(value) => setQueueSubdomain(value)}
              className={styles.input}
              required
            />
            <Input
              type="text"
              placeholder="App URL"
              label="App URL"
              value={url}
              onChange={(value) => setUrl(value)}
              className={styles.input}
              required
            />
            <Input
              type="number"
              placeholder="Target latency (in milliseconds)"
              label="Target latency (in milliseconds)"
              value={targetLatency}
              onChange={(value) => setTargetLatency(value)}
              className={styles.input}
              required
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
        <div className={styles.previewContainer}>
          <QueuePreview customMessage={waitingMessage} />
        </div>
      </section>
    </Page>
  );
};

export default CreateApp;
