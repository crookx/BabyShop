import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.qaranbaby.com/api'
  : 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/auth/login?returnTo=' + encodeURIComponent(window.location.pathname);
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const productApi = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error - getProductById:', error);
      throw error?.response?.data || error;
    }
  },

  getRelatedProducts: async (productId) => {
    try {
      const response = await api.get(`/products/related/${productId}`);
      return response.data;
    } catch (error) {
      console.error('API Error - getRelatedProducts:', error);
      throw error?.response?.data || error;
    }
  },

  getQuestions: async (productId) => {
    try {
      const response = await api.get(`/questions/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error('API Error - getQuestions:', error);
      throw error?.response?.data || error;
    }
  },

  submitQuestion: async (productId, questionData) => {
    try {
      const response = await api.post(`/questions/product/${productId}`, questionData);
      return response.data;
    } catch (error) {
      console.error('API Error - submitQuestion:', error);
      throw error?.response?.data || error;
    }
  },

  getSpecialOffers: async () => {
    try {
      const response = await api.get('/offers');
      return response.data;
    } catch (error) {
      console.error('API Error - getSpecialOffers:', error);
      throw error?.response?.data || error;
    }
  }
};

export const cartApi = {
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post('/cart/add', {
      productId,
      quantity
    });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await api.post('/cart/remove', {
      productId
    });
    return response.data;
  },

  fetchCartItems: async () => {
    const response = await api.get('/cart');
    return response.data;
  }
};

export const wishlistApi = {
  toggleWishlist: async (productId) => {
    const response = await api.post('/wishlist', {
      productId
    });
    return response.data;
  },

  getWishlist: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  }
};

export const reviewApi = {
  getProductReviews: async (productId, params) => {
    const response = await api.get(`/reviews/${productId}`, { params });
    return response.data;
  },

  getReviewStats: async (productId) => {
    const response = await api.get(`/reviews/stats/${productId}`);
    return response.data;
  },

  submitReview: async (productId, reviewData) => {
    const response = await api.post('/reviews', { ...reviewData, productId });
    return response.data;
  },

  markHelpful: async (reviewId) => {
    const response = await api.post(`/reviews/${reviewId}/helpful`);
    return response.data;
  }
};

export {
    api as default
};