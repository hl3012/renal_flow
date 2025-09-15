import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.106:4000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  async config => {
    const token = ''; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;

