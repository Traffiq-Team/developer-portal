import authRequest from '../common/utils/authRequest';

function deleteAppConfiguration(appName) {
  return authRequest('DELETE', `/configs/${appName}`);
}

export default deleteAppConfiguration;
