import { SET_IS_LOADING } from './actions';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    default:
  }
};

export default reducer;
