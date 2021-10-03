import { SET_IS_AUTHENTICATED } from './actions';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: payload };
    default:
  }
};

export default reducer;
