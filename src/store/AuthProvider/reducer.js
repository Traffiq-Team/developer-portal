import { SET_AUTHENTICATED, SET_USERNAME } from './actions';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: payload };
    case SET_USERNAME:
      return { ...state, username: payload };
    default:
  }
};

export default reducer;
