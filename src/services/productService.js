import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const productService = {
  getFeatured: async () => {
    const response = await axios.get(`${BASE_URL}/products/featured`);
    return response.data;
  },

  getSpecialOffers: async () => {
    const response = await axios.get(`${BASE_URL}/products/special-offers`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  },

  addToCart: async (productId) => {
    const response = await axios.post(`${BASE_URL}/cart/add`, { productId });
    return response.data;
  },

  addToWishlist: async (productId) => {
    const response = await axios.post(`${BASE_URL}/wishlist/add`, { productId });
    return response.data;
  }
};