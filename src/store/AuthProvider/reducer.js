import { SET_AUTHENTICATED } from './actions';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: payload };
    default:
  }
};

export default reducer;
