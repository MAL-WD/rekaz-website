import axios from 'axios';

const apiBase = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/admin` 
  : '/api/admin';

const API = axios.create({
  baseURL: apiBase,
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
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default API;
