import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PlusIcon } from 'evergreen-ui';
import Page from '../../components/Page';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './styles.module.css';
import AppsTable from './AppsTable';

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    makeDocumentTitle('Dashboard');
  }, []);

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
        <AppsTable />
      </section>
    </Page>
  );
};

export default Dashboard;
