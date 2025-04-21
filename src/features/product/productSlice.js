import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://qaran.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const initialState = {
  items: [],
  featured: [],
  categories: [],
  specialOffers: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  }
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params) => {
    try {
      const categorySlug = params.category?.toLowerCase().replace(/\s+/g, '-');
      
      const response = await api.get('products', { 
        params: {
          page: params.page || 1,
          category: categorySlug || '',
          priceRange: params.priceRange || '0-1000',
          ageGroup: params.ageGroup || ''
        }
      });
      
      console.log('API Response:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error.response?.data?.message || 'Failed to fetch products';
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    try {
      const response = await api.get('products/categories');
      return response.data?.data || [];
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch categories';
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async () => {
    try {
      const response = await api.get('products/featured');
      return Array.isArray(response.data) ? response.data : response.data?.data || [];
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch featured products';
    }
  }
);

export const fetchSpecialOffers = createAsyncThunk(
  'products/fetchSpecialOffers',
  async () => {
    try {
      const response = await api.get('products/offers');
      return response.data?.data?.offers || [];
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch special offers';
    }
  }
);

// ...existing reducers and slice code...