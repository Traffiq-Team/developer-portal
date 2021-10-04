import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import getAllAppConfigurations from '../../api/getAllAppConfigurations';
import styles from './styles.module.css';

const Dashboard = () => {
  const [appConfigurations, setAppConfigurations] = useState([]);

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

  return (
    <Page>
      <h1>Dashboard</h1>
      <ul>
        {appConfigurations.map(({ appName }) => (
          <li key={appName}>
            <Link to={`/app/${appName}`}>{appName}</Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default Dashboard;
