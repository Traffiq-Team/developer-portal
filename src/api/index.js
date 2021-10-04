import axios from 'axios';
import config from '../config';

function authRequest(method, endpoint, data = {}) {
  const token = localStorage.getItem('authToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const url = `${config.baseUrl}${endpoint}`;

  return axios({ method, url, data, headers });
}

export default authRequest;
