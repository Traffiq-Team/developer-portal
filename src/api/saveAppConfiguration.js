import authRequest from '../common/utils/authRequest';

function editAppConfiguration(appName, payload) {
  return authRequest('POST', `/configs/${appName}`, payload);
}

export default editAppConfiguration;
