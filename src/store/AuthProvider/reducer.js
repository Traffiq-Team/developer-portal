import { SET_AUTH_TOKEN } from './actions';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_AUTH_TOKEN:
      return { ...state, token: payload, isAuthenticated: !!payload };
    default:
  }
};

export default reducer;
