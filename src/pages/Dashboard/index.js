import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import {
  Dialog,
  Button,
  IconButton,
  TrashIcon,
  EditIcon,
  PlusIcon,
  Tooltip,
  Position,
} from 'evergreen-ui';
import Page from '../../components/Page';
import getAllAppConfigurations from '../../api/getAllAppConfigurations';
// import Button from '../../components/Button';
import Input from '../../components/Input';
import deleteAppConfiguration from '../../api/deleteAppConfiguration';
import styles from './styles.module.css';

const Dashboard = () => {
  const [appConfigurations, setAppConfigurations] = useState([]);
  const [focusedAppName, setFocusedAppName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  const populateAppConfigurations = async () => {
    try {
      const appConfigurations = await getAllAppConfigurations();
      setAppConfigurations(appConfigurations);
    } catch (error) {
      console.error('error from _getAllAppConfigurations', error);
    }
  };

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

  return (
    <Page>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <Button
          appearance="primary"
          size="large"
          iconBefore={PlusIcon}
          onClick={() => history.push('/create')}
        >
          Create new app
        </Button>
      </header>
      <section className={styles.section}>
        <Input
          className={styles.search}
          placeholder="Search for app name"
          fullWidth
        />
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableRow}>
              <th className={styles.tableHead}>App Name</th>
              <th className={styles.tableHead}>URL</th>
              <th className={styles.tableHead}>
                Target Latency (in milliseconds)
              </th>
              <th className={classNames(styles.tableHead, styles.actionsHead)}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {appConfigurations.map(({ appName, config }) => (
              <tr key={appName} className={styles.tableRow}>
                {/* <Link to={`/app/${appName}`}>{appName}</Link> */}
                <td className={styles.tableData}>{appName}</td>
                <td className={styles.tableData}>{config.url}</td>
                <td className={styles.tableData}>{config.targetLatency}</td>
                <td
                  className={classNames(styles.tableData, styles.actionsData)}
                >
                  <span className={styles.actions}>
                    <Tooltip content="Edit app" position={Position.TOP}>
                      <IconButton
                        icon={EditIcon}
                        onClick={() => handleEditClick(appName)}
                        appearance="minimal"
                      />
                    </Tooltip>
                    <Tooltip content="Delete app" position={Position.TOP}>
                      <IconButton
                        icon={TrashIcon}
                        onClick={() => setFocusedAppName(appName)}
                        appearance="minimal"
                        intent="danger"
                      />
                    </Tooltip>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
