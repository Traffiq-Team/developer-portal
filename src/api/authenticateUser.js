import authRequest from '../common/utils/authRequest';

function authenticateUser(username, password) {
  return authRequest('POST', '/users/auth', { username, password });
}

export default authenticateUser;
