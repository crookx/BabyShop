const ENV = process.env.NODE_ENV || 'development';

const config = {
  development: {
    baseURL: 'http://localhost:8080/api',
    siteURL: 'http://localhost:3000'
  },
  production: {
    baseURL: 'https://qaran.onrender.com/api',
    siteURL: 'https://baby-shop-xi.vercel.app'
  }
};

export const API_CONFIG = {
  ...config[ENV],
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
};

export const API_ENDPOINTS = {
  CART: '/cart',
  WISHLIST: '/wishlist',
  PRODUCTS: '/products',
  AUTH: '/auth'
};