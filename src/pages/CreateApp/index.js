import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { toaster } from 'evergreen-ui';
import validUrl from 'valid-url';
import Page from '../../components/Page';
import Input from '../../components/Input';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import TextArea from '../../components/TextArea';
import QueuePreview from '../../components/QueuePreview';
import isValidSubdomain from '../../common/utils/isValidSubdomain';
import createApp from '../../api/createApp';
import styles from './styles.module.css';

const CreateApp = () => {
  const [appName, setAppName] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [queueSubdomain, setQueueSubdomain] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const [waitingMessage, setWaitingMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const previewQueueUrl = useMemo(
    () => queueSubdomain && `${queueSubdomain}.traffiq.live`,
    [queueSubdomain],
  );

  const canSubmit = useMemo(
    () => appName && appUrl && targetLatency,
    [appName, appUrl, targetLatency],
  );

  useEffect(() => {
    makeDocumentTitle('Create a new app');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      toaster.danger('One or more required input fields are missing values.');
      return;
    }

    if (!isValidSubdomain(queueSubdomain)) {
      toaster.danger(
        'Queue subdomain is invalid, please try using something else.',
      );
      return;
    }

    if (!validUrl.isWebUri(appUrl)) {
      toaster.danger('App URL is invalid, please try using something else.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createApp(
        appName,
        queueSubdomain,
        appUrl,
        parseFloat(targetLatency),
        waitingMessage,
      );

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
              value={queueSubdomain}
              onChange={(value) => setQueueSubdomain(value)}
              className={styles.input}
              info="The subdomain CANNOT be modified after you create an app."
              required
            />
            <Input
              type="text"
              placeholder="App URL"
              label="App URL"
              value={appUrl}
              onChange={(value) => setAppUrl(value)}
              className={styles.input}
              info="The URL CANNOT be modified once you create an app."
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
          <QueuePreview
            customMessage={waitingMessage}
            queueUrl={previewQueueUrl}
          />
        </div>
      </section>
    </Page>
  );
};

export default CreateApp;
