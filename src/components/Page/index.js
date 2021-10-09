import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ArrowLeftIcon, Button, LogOutIcon } from 'evergreen-ui';
import styles from './styles.module.css';

const Page = ({ children, edgePadding, showNavigation, showBack }) => {
  const history = useHistory();

  const handleLogoutClick = () => {
    // TODO: Call logout endpoint
    history.push('/home/login');
  };

  return (
    <section className={styles.page}>
      {showNavigation && (
        <nav className={styles.nav}>
          {showBack ? (
            <Button
              iconBefore={ArrowLeftIcon}
              onClick={() => history.goBack()}
              appearance="minimal"
              size="large"
            >
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button
            iconBefore={LogOutIcon}
            onClick={handleLogoutClick}
            appearance="minimal"
            size="large"
          >
            Log out
          </Button>
        </nav>
      )}
      <main
        className={classNames(
          styles.main,
          !edgePadding && styles.noEdgePadding,
        )}
      >
        {children}
      </main>
      <footer className={styles.footer}>powered by Traffiq</footer>
    </section>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  edgePadding: PropTypes.bool,
  showNavigation: PropTypes.bool,
  showBack: PropTypes.bool,
};

Page.defaultProps = {
  edgePadding: true,
  showNavigation: true,
  showBack: true,
};

export default Page;
