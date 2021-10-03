import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';
import initialState from './initialState';

const GlobalContext = createContext({});
const { Provider } = GlobalContext;

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalProvider };
export default GlobalContext;
