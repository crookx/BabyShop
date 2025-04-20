var ENV = process.env.NODE_ENV || 'development';

const config = {
  development: {
    API_URL: 'http://localhost:8080',  // Remove /api since it's added in endpoints
    SITE_URL: 'http://localhost:3000'
  },
  production: {
    API_URL: 'https://qaran.onrender.com',  // Remove /api here too
    SITE_URL: 'https://baby-shop-mcqv-h1tp7d2j0-crookxs-projects.vercel.app'
  }
};

export const API_CONFIG = config[ENV];

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout'
  },
  CART: '/api/cart',
  WISHLIST: '/api/wishlist',
  PRODUCTS: '/api/products'
};

export const getAuthHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});