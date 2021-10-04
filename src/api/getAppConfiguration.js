import authRequest from '.';

function getAppConfiguration(appName) {
  return authRequest('GET', `/configs/${appName}`);
}

export default getAppConfiguration;
