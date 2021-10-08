import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import Info from './Info';
import Login from './Login';
import Signup from './Signup';
import styles from './styles.module.css';

const Home = () => {
  const { formType } = useParams();

  const renderForm = () => {
    return formType === 'login' ? <Login /> : <Signup />;
  };

  return (
    <Page edgePadding={false} showNavigation={false}>
      <section className={styles.container}>
        <div className={styles.left}>
          <Info />
        </div>
        <div className={styles.right}>{renderForm()}</div>
      </section>
    </Page>
  );
};

export default Home;
