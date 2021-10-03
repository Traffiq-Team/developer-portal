import authRequest from '.';

function authenticateUser(username, password) {
  return authRequest('POST', '/users/token', { username, password });
}

export default authenticateUser;
