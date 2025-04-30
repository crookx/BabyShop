import axios from '../config/axios';
import { API_CONFIG } from '../config/api';

const validateResponse = (response) => {
  if (!response?.data) {
    throw new Error('Invalid response format');
  }
  return response;
};

const handleApiError = (error) => {
  if (error.message === 'Invalid response type: expected JSON') {
    throw new Error('Server returned an invalid response format');
  }
  if (error.response?.status === 404) {
    throw new Error('Product not found');
  }
  throw error;
};

const validateProductData = (data) => {
  if (!data?._id || !data?.name || typeof data?.price !== 'number') {
    throw new Error('Invalid product data structure');
  }
  return data;
};

export const productApi = {
  getAll: async () => {
    try {
      const response = await axios.get(API_CONFIG.ENDPOINTS.PRODUCTS.BASE);
      return validateResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  getById: async (id) => {
    if (!id) throw new Error('Product ID is required');
    try {
      const response = await axios.get(`${API_CONFIG.ENDPOINTS.PRODUCTS.BASE}/${id}`);
      return { data: validateProductData(response.data) };
    } catch (error) {
      if (error.message === 'Server returned non-JSON response') {
        throw new Error('Server error: Please try again later');
      }
      throw error;
    }
  },
  
  getByCategory: async (categoryId) => {
    try {
      const response = await axios.get(API_CONFIG.ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId));
      return validateResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  getFeatured: async () => {
    try {
      const response = await axios.get(API_CONFIG.ENDPOINTS.PRODUCTS.FEATURED);
      return validateResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  getOffers: async () => {
    try {
      const response = await axios.get(API_CONFIG.ENDPOINTS.PRODUCTS.OFFERS);
      return validateResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export const categoryApi = {
  getAll: async () => {
    try {
      const response = await axios.get(API_CONFIG.ENDPOINTS.CATEGORIES.BASE);
      if (!response?.data) throw new Error('Invalid category response');
      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_CONFIG.ENDPOINTS.CATEGORIES.BASE}/${id}`);
      if (!response?.data) throw new Error('Invalid category response');
      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  getProducts: async (categoryId) => {
    try {
      const response = await axios.get(`${API_CONFIG.ENDPOINTS.CATEGORIES.BASE}/${categoryId}/products`);
      return validateResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};