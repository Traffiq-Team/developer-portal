import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';
import initialState from './initialState';

const AuthContext = createContext({});
const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(reducer, initialState);

  return <Provider value={{ authState, authDispatch }}>{children}</Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
export default AuthContext;
