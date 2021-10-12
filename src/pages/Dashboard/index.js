import React, { useEffect } from 'react';
import Page from '../../components/Page';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import styles from './styles.module.css';
import AppsTable from './AppsTable';

const Dashboard = () => {
  useEffect(() => {
    makeDocumentTitle('Dashboard');
  }, []);

  return (
    <Page showBack={false}>
      <section className={styles.content}>
        <AppsTable />
      </section>
    </Page>
  );
};

export default Dashboard;
