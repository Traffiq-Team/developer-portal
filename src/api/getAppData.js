import authRequest from '../common/utils/authRequest';

async function getAppData(appName) {
  const { data } = await authRequest('GET', `/apps/${appName}`);
  return data;
}

export default getAppData;
