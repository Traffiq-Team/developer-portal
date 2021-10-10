import authRequest from '../common/utils/authRequest';

function logOutUser() {
  return authRequest('POST', '/users/logout');
}

export default logOutUser;
