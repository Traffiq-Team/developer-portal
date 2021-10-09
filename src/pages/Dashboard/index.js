import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Dialog } from 'evergreen-ui';
import Page from '../../components/Page';
import getAllAppConfigurations from '../../api/getAllAppConfigurations';
import Button from '../../components/Button';
import Input from '../../components/Input';
import EditIcon from '../../components/icons/EditIcon';
import TrashIcon from '../../components/icons/TrashIcon';
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
        <Button onClick={() => history.push('/create')}>Create new app</Button>
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
                    <EditIcon
                      className={classNames(styles.icon, styles.editIcon)}
                      onClick={() => handleEditClick(appName)}
                    />
                    <TrashIcon
                      className={classNames(styles.icon, styles.trashIcon)}
                      onClick={() => setFocusedAppName(appName)}
                    />
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
