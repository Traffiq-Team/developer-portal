import React, { useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../store/AuthProvider';
import checkAuthentication from '../../api/checkAuthentication';
import { SET_AUTHENTICATED } from '../../store/AuthProvider/actions';

const AuthRoute = ({ exact, path, component }) => {
  const { authDispatch } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const _checkAuthentication = async () => {
      try {
        await checkAuthentication();
        authDispatch({ type: SET_AUTHENTICATED, payload: true });
      } catch (error) {
        authDispatch({ type: SET_AUTHENTICATED, payload: false });
        history.push('/home/login');
      }
    };

    _checkAuthentication();
  }, [authDispatch]);

  return <Route exact={exact} path={path} component={component} />;
};

AuthRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

AuthRoute.defaultProps = {
  exact: false,
};

export default AuthRoute;
