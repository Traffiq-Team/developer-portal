import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toaster, Button, Dialog } from 'evergreen-ui';
import Page from '../../components/Page';
import Input from '../../components/Input';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import TextArea from '../../components/TextArea';
import OverlaySpinner from '../../components/OverlaySpinner';
import deleteApp from '../../api/deleteApp';
import QueuePreview from '../../components/QueuePreview';
import saveApp from '../../api/saveApp';
import getAppData from '../../api/getAppData';
import styles from './styles.module.css';

const PUBLIC_KEY_URL = 'https://api.traffiq.xyz/publicKey';

const EditApp = () => {
  const [appUrl, setAppUrl] = useState('');
  const [queueUrl, setQueueUrl] = useState('');
  const [targetLatency, setTargetLatency] = useState('');
  const [specialTitle, setSpecialTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();
  const { appName } = useParams();

  useEffect(() => {
    makeDocumentTitle(`${appName} settings`);
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const { appUrl, config, message, queueUrl } = await getAppData(appName);
        const { targetLatency } = config;

        setAppUrl(appUrl);
        setQueueUrl(queueUrl);
        setTargetLatency(targetLatency);
        setSpecialTitle(message);
      } catch (error) {
        toaster.danger(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      await saveApp(appName, targetLatency, specialTitle);
      history.push('/dashboard');
    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteApp(appName);
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
            <h1 className={styles.title}>{`"${appName}" settings`}</h1>
            <form className={styles.form}>
              <Input
                type="text"
                placeholder="Queue URL"
                label="Queue URL"
                value={queueUrl}
                onChange={(value) => setQueueUrl(value)}
                className={styles.input}
                info="The Queue URL can't be modified once you create an app. If you want to use a different subdomain for the URL, you must create a new app."
                disabled
              />
              <Input
                type="text"
                placeholder="App URL"
                label="App URL"
                value={appUrl}
                onChange={(value) => setAppUrl(value)}
                className={styles.input}
                info="The App URL can't be modified once you create an app. If want to use a different URL, you must create a new app."
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
                value={specialTitle}
                onChange={(value) => setSpecialTitle(value)}
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
                  intent="default"
                  size="large"
                  onClick={() => window.open(PUBLIC_KEY_URL, '_blank').focus()}
                >
                  Download Public Key
                </Button>
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
            <QueuePreview customTitle={specialTitle} queueUrl={queueUrl} />
          </div>
        </section>
        <Dialog
          isShown={showDeleteDialog}
          intent="danger"
          confirmLabel="Delete"
          title="Delete app"
          onConfirm={handleDelete}
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
