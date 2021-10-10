import authRequest from '../common/utils/authRequest';

function createAccount(username, password) {
  return authRequest('POST', '/users', { username, password });
}

export default createAccount;
