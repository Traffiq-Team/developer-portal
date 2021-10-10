import axios from 'axios';
import config from '../../config';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? config.dev.baseUrl
    : config.prod.baseUrl;

function authRequest(method, endpoint, data = {}) {
  const url = `${baseUrl}${endpoint}`;

  return axios({ method, url, data, withCredentials: true });
}

export default authRequest;
