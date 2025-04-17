export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://qaran.onrender.com';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`
  },
  PRODUCTS: `${API_BASE_URL}/api/products`,
  WISHLIST: `${API_BASE_URL}/api/wishlist`,
  CART: `${API_BASE_URL}/api/cart`
};

export const getAuthHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});