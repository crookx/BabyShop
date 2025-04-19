import axios from 'axios';
import { envConfig } from '../config/env.config';

const api = axios.create({
  baseURL: envConfig.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const productService = {
  getFeatured: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  getSpecialOffers: async () => {
    const response = await api.get('/products/offers');
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  }
};