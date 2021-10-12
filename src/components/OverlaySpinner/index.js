import React from 'react';
import { Overlay, Spinner } from 'evergreen-ui';
import styles from './styles.module.css';

const OverlaySpinner = () => {
  return (
    <Overlay
      shouldCloseOnClick={false}
      shouldCloseOnEscapePress={false}
      isShown
    >
      <div className={styles.spinnerContainer}>
        <Spinner size={72} className={styles.spinner} />
      </div>
    </Overlay>
  );
};

export default OverlaySpinner;
