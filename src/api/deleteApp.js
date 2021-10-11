import authRequest from '../common/utils/authRequest';

function deleteApp(appName) {
  return authRequest('DELETE', `/apps/${appName}`);
}

export default deleteApp;
