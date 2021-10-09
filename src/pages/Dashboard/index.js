import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Page from '../../components/Page';
import getAllAppConfigurations from '../../api/getAllAppConfigurations';
import Button from '../../components/Button';
import Input from '../../components/Input';
import editIcon from '../../assets/icons/edit-solid.svg';
import styles from './styles.module.css';

const Dashboard = () => {
  const [appConfigurations, setAppConfigurations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const _getAllAppConfigurations = async () => {
      try {
        const appConfigurations = await getAllAppConfigurations();
        setAppConfigurations(appConfigurations);
      } catch (error) {
        console.error('error from _getAllAppConfigurations', error);
      }
    };

    _getAllAppConfigurations();
  }, []);

  const handleEditClick = (appName) => {
    history.push(`/app/${appName}`);
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
                  <Link to={`/app/${appName}`}>
                    <img className={styles.edit} src={editIcon} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Page>
  );
};

export default Dashboard;
