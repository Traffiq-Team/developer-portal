import authRequest from '../common/utils/authRequest';

async function createApp(appName, subdomain, appUrl, targetLatency, message) {
  await authRequest('POST', `/apps/${appName}`, { subdomain, appUrl });
  await authRequest('PUT', `/configs/${appName}`, { targetLatency });
  await authRequest('PUT', `/messages/${appName}`, { message });
}

export default createApp;
