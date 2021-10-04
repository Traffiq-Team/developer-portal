import { SET_AUTH_TOKEN, SET_APP_NAME, SET_APP_CONFIGURATION } from './actions';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_AUTH_TOKEN:
      return { ...state, token: payload, isAuthenticated: !!payload };
    case SET_APP_NAME:
      return { ...state, appName: payload };
    case SET_APP_CONFIGURATION:
      return { ...state, appConfiguration: payload };
    default:
  }
};

export default reducer;
