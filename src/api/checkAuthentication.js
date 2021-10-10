import authRequest from '../common/utils/authRequest';

async function checkAuthentication(username, password) {
  const { data } = await authRequest('POST', '/users/auth');
  return data;
}

export default checkAuthentication;
