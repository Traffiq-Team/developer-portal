import authRequest from '../common/utils/authRequest';

function authenticateUser(username, password) {
  return authRequest('POST', '/users/login', { username, password });
}

export default authenticateUser;
