import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../store/AuthProvider';

const AuthRoute = ({ exact, path, component }) => {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated } = authState;

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

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
