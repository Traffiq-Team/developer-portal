import React from 'react';
import Page from '../../components/Page';
import Login from './Login';
import styles from './styles.module.css';

const Home = () => {
  return (
    <Page edgePadding={false}>
      <section className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <Login />
        </div>
      </section>
    </Page>
  );
};

export default Home;
