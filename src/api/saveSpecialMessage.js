import authRequest from '../common/utils/authRequest';

function saveSpecialMessage(appName, payload) {
  return authRequest('PUT', `/messages/${appName}`, payload);
}

export default saveSpecialMessage;
