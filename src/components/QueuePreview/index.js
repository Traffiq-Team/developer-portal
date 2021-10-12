import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import blocksLoading from './mock-queue-loading.png';

const defaultTitle = 'Waiting Queue';

const QueuePreview = ({ customTitle, queueUrl }) => {
  const title = customTitle || defaultTitle;

  return (
    <div className={styles.browserContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.browserAddressBar}>{queueUrl}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.header}></div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.title}>{title}</div>
            <p className={styles.customMessage}>
              Your current position in the queue is
            </p>
            <div className={styles.position}>100</div>
          </div>
          <div className={styles.right}>
            <img src={blocksLoading} className={styles.loading} />
          </div>
        </div>
        <div className={styles.footer}>powered by Traffiq</div>
      </div>
    </div>
  );
};

QueuePreview.propTypes = {
  customTitle: PropTypes.string.isRequired,
  queueUrl: PropTypes.string.isRequired,
};

export default QueuePreview;
