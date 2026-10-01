import axios from 'axios';

const API = axios.create({
  baseURL: '/api/admin',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('rekaz_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('rekaz_admin_token');
      localStorage.removeItem('rekaz_admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
