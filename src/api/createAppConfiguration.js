import authRequest from '../common/utils/authRequest';

function createAppConfiguration(appName, payload) {
  return authRequest('POST', `/configs/${appName}`, payload);
}

export default createAppConfiguration;
