const ENV = process.env.NODE_ENV || 'development';
const API_BASE_URL = ENV === 'production' 
  ? 'https://baby-shop-mcqv-h1tp7d2j0-crookxs-projects.vercel.app/api'
  : 'http://localhost:8080/api';

export const API_CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || API_BASE_URL,
  endpoints: {
    cart: {
      base: '/cart',
      add: '/cart',
      remove: '/cart',
      update: '/cart'
    },
    wishlist: {
      base: '/wishlist',
      add: '/wishlist',
      remove: '/wishlist'
    },
    products: {
      base: '/products',
      featured: '/products/featured',
      offers: '/products/offers',
      categories: '/categories'
    }
  }
};