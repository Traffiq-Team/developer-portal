import authRequest from '../common/utils/authRequest';

async function checkAuthentication(username, password) {
  const { data } = await authRequest('POST', '/users/login');
  return data;
}

export default checkAuthentication;
