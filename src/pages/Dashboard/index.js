import React, { useEffect } from 'react';
import Page from '../../components/Page';
import makeDocumentTitle from '../../common/utils/makeDocumentTitle';
import styles from './styles.module.css';
import AppsTable from './AppsTable';
import CodeIntegration from './CodeIntegration';

const Dashboard = () => {
  useEffect(() => {
    makeDocumentTitle('Dashboard');
  }, []);

  return (
    <Page showBack={false}>
      <section className={styles.content}>
        <AppsTable />
        <CodeIntegration />
      </section>
    </Page>
  );
};

export default Dashboard;
