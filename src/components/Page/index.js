import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  ArrowLeftIcon,
  Avatar,
  Button,
  LogOutIcon,
  Menu,
  Popover,
  Position,
} from 'evergreen-ui';
import AuthContext from '../../store/AuthProvider';
import logOutUser from '../../api/logOutUser';
import styles from './styles.module.css';

const Page = ({ children, edgePadding, showNavigation, showBack }) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const { username } = authState;

  const handleLogoutClick = async () => {
    try {
      await logOutUser();
      history.push('/home/login');
    } catch (error) {
      console.error('Error from logging out user', error);
    }
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
          {username ? (
            <Popover
              position={Position.BOTTOM_RIGHT}
              content={
                <Menu>
                  <Menu.Group>
                    <Menu.Item onSelect={handleLogoutClick} icon={LogOutIcon}>
                      Log out
                    </Menu.Item>
                  </Menu.Group>
                </Menu>
              }
            >
              <span className={styles.avatar}>
                <Avatar name={username} size={32} />
              </span>
            </Popover>
          ) : (
            <span />
          )}
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
