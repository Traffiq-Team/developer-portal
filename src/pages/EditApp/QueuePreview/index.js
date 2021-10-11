import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import blocksLoading from './mock-queue-loading.png';

const defaultMessage = 'Your current position in the queue is';

const QueuePreview = ({ customMessage }) => {
  const message = customMessage || defaultMessage;

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.title}>Waiting Queue</div>
          <p className={styles.customMessage}>{message}</p>
          <div className={styles.position}>100</div>
        </div>
        <div className={styles.right}>
          <img src={blocksLoading} className={styles.loading} />
        </div>
      </div>
      <div className={styles.footer}>Powered by Traffiq</div>
    </div>
  );
};

QueuePreview.propTypes = {
  customMessage: PropTypes.string.isRequired,
};

export default QueuePreview;