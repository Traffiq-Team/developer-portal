import authRequest from '../common/utils/authRequest';

function getAppConfiguration(appName) {
  return authRequest('GET', `/configs/${appName}`);
}

export default getAppConfiguration;
