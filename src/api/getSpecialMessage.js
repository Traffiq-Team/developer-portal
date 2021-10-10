import authRequest from '../common/utils/authRequest';

async function getSpecialMessage(appName) {
  const { data } = await authRequest('GET', `/messages/${appName}`);
  return data;
}

export default getSpecialMessage;
