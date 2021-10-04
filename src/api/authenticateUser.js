import authRequest from '../common/utils/authRequest';

function authenticateUser(username, password) {
  return authRequest('POST', '/users/token', { username, password });
}

export default authenticateUser;
