import axios from 'axios';

function authRequest(method, url, data = {}) {
  const token = localStorage.getItem('authToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios({ method, url, data, headers });
}

export default authRequest;
