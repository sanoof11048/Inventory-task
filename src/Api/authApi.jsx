import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://vikncodestask-backend.onrender.com/api'
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default authApi;