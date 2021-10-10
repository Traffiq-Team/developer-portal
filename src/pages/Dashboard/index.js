import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  Button,
  IconButton,
  TrashIcon,
  EditIcon,
  PlusIcon,
  Table,
} from 'evergreen-ui';
import Fuse from 'fuse.js';
import Page from '../../components/Page';
import getAllAppConfigurations from '../../api/getAllAppConfigurations';
import deleteAppConfiguration from '../../api/deleteAppConfiguration';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './styles.module.css';

const fuseOptions = {
  keys: ['appName'],
};

const Dashboard = () => {
  const [appConfigurations, setAppConfigurations] = useState([]);
  const [focusedAppName, setFocusedAppName] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();
  const fuse = new Fuse(appConfigurations, fuseOptions);

  const populateAppConfigurations = async () => {
    try {
      const appConfigurations = await getAllAppConfigurations();
      setAppConfigurations(appConfigurations);
    } catch (error) {
      console.error('error from populateAppConfigurations', error);
    }
  };

  useEffect(() => {
    makeDocumentTitle('Dashboard');
  }, []);

  useEffect(() => {
    populateAppConfigurations();
  }, []);

  const handleEditClick = (appName) => {
    history.push(`/app/${appName}`);
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true);

    try {
      await deleteAppConfiguration(focusedAppName);
      setFocusedAppName('');
    } catch (error) {
      console.error('error from handleDeleteClick', error);
    } finally {
      setIsDeleting(false);

      // Fetch the app configurations again after making changes
      populateAppConfigurations();
    }
  };

  const filteredAppConfigurations = useMemo(
    () =>
      searchValue
        ? fuse.search(searchValue).map(({ item }) => item)
        : appConfigurations,
    [searchValue, appConfigurations],
  );

  return (
    <Page showBack={false}>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <PrimaryButton
            size="large"
            iconBefore={PlusIcon}
            onClick={() => history.push('/create')}
          >
            Create new app
          </PrimaryButton>
        </header>
        <Table>
          <Table.Head>
            <Table.SearchHeaderCell
              placeholder="Search for App name"
              onChange={(value) => setSearchValue(value)}
            />
            <Table.TextHeaderCell>URL</Table.TextHeaderCell>
            <Table.TextHeaderCell>
              Target Latency (in milliseconds)
            </Table.TextHeaderCell>
            <Table.HeaderCell justifyContent="flex-end">
              Actions
            </Table.HeaderCell>
          </Table.Head>
          <Table.Body maxHeight={384}>
            {filteredAppConfigurations.map(({ appName, config }) => (
              <Table.Row key={appName}>
                <Table.TextCell>{appName}</Table.TextCell>
                <Table.TextCell>{config.url}</Table.TextCell>
                <Table.TextCell isNumber>{config.targetLatency}</Table.TextCell>
                <Table.Cell justifyContent="flex-end">
                  <span className={styles.actions}>
                    <IconButton
                      icon={EditIcon}
                      onClick={() => handleEditClick(appName)}
                      appearance="minimal"
                    />
                    <IconButton
                      icon={TrashIcon}
                      onClick={() => setFocusedAppName(appName)}
                      appearance="minimal"
                      intent="danger"
                    />
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
      <Dialog
        isShown={!!focusedAppName}
        intent="danger"
        confirmLabel="Delete"
        title="Delete app"
        onConfirm={handleDeleteClick}
        onCloseComplete={() => setFocusedAppName('')}
        isConfirmLoading={isDeleting}
        preventBodyScrolling
      >
        Are you sure you want to delete <strong>{focusedAppName}</strong>?
      </Dialog>
    </Page>
  );
};

export default Dashboard;
