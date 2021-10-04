import authRequest from '.';

function editAppConfiguration(appName, payload) {
  return authRequest('PUT', `/configs/${appName}`, payload);
}

export default editAppConfiguration;
