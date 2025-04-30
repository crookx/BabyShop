import axios from 'axios';
import { API_CONFIG } from '../config/api';

const publicApi = axios.create({
  baseURL: API_CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Remove any default authorization headers
delete publicApi.defaults.headers.common['Authorization'];

export const productService = {
  getFeatured: async () => {
    try {
      const response = await publicApi.get('/api/products/featured', { 
        withCredentials: false 
      });
      console.log('Featured API Response:', response.data);
      return response.data?.data?.products || [];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  getSpecialOffers: async () => {
    try {
      const response = await publicApi.get('/api/products/offers', { 
        withCredentials: false 
      });
      console.log('Offers API Response:', response.data);
      return response.data?.data?.offers || [];
    } catch (error) {
      console.error('Error fetching special offers:', error);
      return [];
    }
  },

  getCategories: async () => {
    try {
      const response = await publicApi.get('/api/products/categories', { 
        withCredentials: false 
      });
      console.log('Categories API Response:', response.data);
      return response.data?.data?.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
};