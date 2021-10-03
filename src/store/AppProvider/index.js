import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';
import initialState from './initialState';

const AppContext = createContext({});
const { Provider } = AppContext;

function AppProvider({ children }) {
  const [appState, appDispatch] = useReducer(reducer, initialState);

  return <Provider value={{ appState, appDispatch }}>{children}</Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider };
export default AppContext;
