import React from 'react';
import ghost from '../../../assets/ghost.png';
import styles from './styles.module.css';

const Info = () => {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.innerBox}>
          <span className={styles.description}>
            Handling application traffic should <em>never</em> be scary.
          </span>
          <img src={ghost} className={styles.image} />
          <span />
        </div>
      </div>
    </section>
  );
};

export default Info;
