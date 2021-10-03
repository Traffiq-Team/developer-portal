import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthenticatedRoute = ({ exact, path, component }) => {
  return <Route exact={exact} path={path} component={component} />;
};

AuthenticatedRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

AuthenticatedRoute.defaultProps = {
  exact: false,
};

export default AuthenticatedRoute;
