import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api.com',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // або отримуй з context/store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
