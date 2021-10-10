import authRequest from '../common/utils/authRequest';

function editAppConfiguration(appName, payload) {
  return authRequest('PUT', `/configs/${appName}`, payload);
}

export default editAppConfiguration;
