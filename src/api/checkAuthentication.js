import authRequest from '../common/utils/authRequest';

function checkAuthentication(username, password) {
  return authRequest('POST', '/users/auth');
}

export default checkAuthentication;
