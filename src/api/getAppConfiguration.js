import authRequest from '../common/utils/authRequest';

async function getAppConfiguration(appName) {
  const { data } = await authRequest('GET', `/configs/${appName}`);
  return data;
}

export default getAppConfiguration;
