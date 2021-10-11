import authRequest from '../common/utils/authRequest';

async function saveApp(appName, targetLatency, message) {
  await authRequest('PUT', `/configs/${appName}`, { targetLatency });
  await authRequest('PUT', `/messages/${appName}`, { message });
}

export default saveApp;
