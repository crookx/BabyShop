import axios from 'axios';
import { envConfig } from '../config/env.config';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
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

export const productApi = {
  getFeatured: () => api.get('/products/featured'),
  getCategories: () => api.get('/products/categories'),
  getSpecialOffers: () => api.get('/products/offers')
};

export default api;