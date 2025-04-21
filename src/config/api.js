const ENV = process.env.NODE_ENV || 'development';

const config = {
  development: {
    API_URL: 'http://localhost:8080',
    SITE_URL: 'http://localhost:3000'
  },
  production: {
    API_URL: 'https://qaran.onrender.com',
    SITE_URL: 'https://baby-shop-mcqv.vercel.app'
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
  PRODUCTS: {
    BASE: '/api/products',
    CATEGORIES: '/api/products/categories',
    FEATURED: '/api/products/featured',
    OFFERS: '/api/products/offers'
  }
};