import authRequest from '../common/utils/authRequest';

async function getAllAppData() {
  const { data } = await authRequest('GET', '/configs');

  return data;
}

export default getAllAppData;
