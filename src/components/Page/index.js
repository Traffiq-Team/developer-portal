import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';

const Page = ({ children, edgePadding }) => {
  return (
    <section className={styles.page}>
      <nav className={styles.nav} />
      <main
        className={classNames(
          styles.main,
          !edgePadding && styles.noEdgePadding,
        )}
      >
        {children}
      </main>
      <footer className={styles.footer}>powered by TraffiQ</footer>
    </section>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  edgePadding: PropTypes.bool,
};

Page.defaultProps = {
  edgePadding: true,
};

export default Page;
