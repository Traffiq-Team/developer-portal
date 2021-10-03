import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';

const AuthContext = createContext({});
const { Provider } = AuthContext;

const initialState = {};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
export default AuthContext;
