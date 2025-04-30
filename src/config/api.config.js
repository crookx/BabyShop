const ENV = process.env.NODE_ENV || 'development';

const config = {
  development: {
    baseURL: 'http://localhost:8080/api',
    siteURL: 'http://localhost:3000'
  },
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    siteURL: process.env.REACT_APP_SITE_URL || 'https://qaranbaby.com'
  }
};

export const API_CONFIG = {
  ...config[ENV],
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export const API_ENDPOINTS = {
  CART: '/cart',
  WISHLIST: '/wishlist',
  PRODUCTS: '/products',
  AUTH: '/auth'
};