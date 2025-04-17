import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qaran.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const productApi = {
  getFeatured: () => api.get('/api/products/featured'),
  getCategories: () => api.get('/api/products/categories'),
  getSpecialOffers: () => api.get('/api/products/offers')
};

export default api;