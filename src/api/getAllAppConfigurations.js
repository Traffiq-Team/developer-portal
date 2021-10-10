import authRequest from '../common/utils/authRequest';

async function getAllAppConfigurations() {
  const { data } = await authRequest('GET', '/configs');

  return data;
}

export default getAllAppConfigurations;
