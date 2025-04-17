import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { envConfig } from '../../config/env.config';
import axios from 'axios';

const api = axios.create({
  baseURL: envConfig.API_URL
});

const initialState = {
  featured: [],
  categories: [],
  specialOffers: [],
  loading: false,
  error: null
};

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/categories');
      console.log('Categories response:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('Categories error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
  }
);

export const fetchFeatured = createAsyncThunk(
  'products/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/featured');
      console.log('Featured response:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('Featured error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch featured products');
    }
  }
);

export const fetchSpecialOffers = createAsyncThunk(
  'products/fetchSpecialOffers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/offers');
      console.log('Offers response:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('Offers error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch special offers');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.specialOffers = action.payload;
      });
  },
});

export default productSlice.reducer;