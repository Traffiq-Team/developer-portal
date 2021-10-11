import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IconButton,
  toaster,
  ClipboardIcon,
  Button,
  Dialog,
} from 'evergreen-ui';
import editAppConfiguration from '../../api/editAppConfiguration';
import getAppConfiguration from '../../api/getAppConfiguration';
import Page from '../../components/Page';
import Input from '../../components/Input';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import getSpecialMessage from '../../api/getSpecialMessage';
import saveSpecialMessage from '../../api/saveSpecialMessage';
import TextArea from '../../components/TextArea';
import OverlaySpinner from '../../components/OverlaySpinner';
import deleteAppConfiguration from '../../api/deleteAppConfiguration';
import QueuePreview from '../../components/QueuePreview';
import styles from './styles.module.css';

const EditApp = () => {
  const [url, setUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const [waitingMessage, setWaitingMessage] = useState('');
  const [apiKey, setApiKey] = useState('AIO21NPA979S0AF');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
        toaster.danger(error.message);
      } finally {
        setIsLoading(false);
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
      toaster.danger(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const copyApiKey = async (e) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(apiKey);
      toaster.success('API Key copied!');
    } catch (error) {
      toaster.danger('Could not copy API Key to clipboard.');
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowDeleteDialog(true);
  };

  const deleteApp = async () => {
    setIsDeleting(true);

    try {
      await deleteAppConfiguration(appName);
      history.push('/dashboard');
    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setShowDeleteDialog(false);
      setIsDeleting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <OverlaySpinner />;
    }

    return (
      <Fragment>
        <section className={styles.section}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>{`Settings for "${appName}"`}</h1>
            <form className={styles.form}>
              <Input
                type="text"
                label="API Key"
                value={apiKey}
                buttonAfter={
                  <IconButton
                    icon={ClipboardIcon}
                    size="large"
                    onClick={copyApiKey}
                  />
                }
                className={styles.input}
                disabled
              />
              <Input
                type="text"
                placeholder="Queue Subdomain"
                label="Queue Subdomain"
                value={url}
                onChange={(value) => setUrl(value)}
                className={styles.input}
                disabled
              />
              <Input
                type="text"
                placeholder="App URL"
                label="App URL"
                value={url}
                onChange={(value) => setUrl(value)}
                className={styles.input}
                disabled
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
              <div className={styles.buttons}>
                <PrimaryButton
                  size="large"
                  onClick={handleSave}
                  isLoading={isSaving}
                >
                  Save
                </PrimaryButton>
                <Button
                  intent="danger"
                  size="large"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </div>
            </form>
          </div>
          <div className={styles.previewContainer}>
            <QueuePreview customMessage={waitingMessage} />
          </div>
        </section>
        <Dialog
          isShown={showDeleteDialog}
          intent="danger"
          confirmLabel="Delete"
          title="Delete app"
          onConfirm={deleteApp}
          onCloseComplete={() => setShowDeleteDialog(false)}
          isConfirmLoading={isDeleting}
          preventBodyScrolling
        >
          Are you sure you want to delete <strong>{appName}</strong>?
        </Dialog>
      </Fragment>
    );
  };

  return <Page>{renderContent()}</Page>;
};

export default EditApp;
