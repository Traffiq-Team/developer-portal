import authRequest from '../common/utils/authRequest';

async function getAllAppConfigurations() {
  const { data } = await authRequest('GET', '/configs');
  const { items } = data;

  return items;
}

export default getAllAppConfigurations;
