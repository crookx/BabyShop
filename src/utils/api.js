import axios from 'axios';
import { envConfig } from '../config/env.config';

const api = axios.create({
  baseURL: `${envConfig.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  credentials: 'include',
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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get('/categories');
export const getCategoryDetails = (slug) => api.get(`/categories/${slug}`);
export const getCategoryProducts = (slug) => api.get(`/categories/${slug}/products`);

export const productApi = {
  getFeatured: () => api.get('/products/featured'),
  getCategories: () => api.get('/products/categories'),
  getSpecialOffers: () => api.get('/products/offers')
};

export default api;