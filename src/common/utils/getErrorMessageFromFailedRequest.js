const defaultMessage = 'Something went wrong! Please try again later.';

const getErrorMessageFromFailedRequest = (error) => {
  return error.response?.data?.message || defaultMessage;
};

export default getErrorMessageFromFailedRequest;
