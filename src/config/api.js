var ENV = process.env.NODE_ENV || 'development';

const config = {
  development: {
    API_URL: 'http://localhost:8080/api',  // Add /api here
    SITE_URL: 'http://localhost:3000'
  },
  production: {
    API_URL: 'https://qaran.onrender.com/api',  // Add /api here
    SITE_URL: 'https://baby-shop-mcqv.vercel.app'
  }
};

export const API_CONFIG = config[ENV];

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',      // Remove /api from here
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout'
  },
  CART: '/cart',               // Remove /api from here
  WISHLIST: '/wishlist',
  PRODUCTS: '/products'        // Remove /api from here
};

export const getAuthHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});