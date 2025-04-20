import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create axios instance with correct base URL
const api = axios.create({
  baseURL: 'https://qaran.onrender.com/api'
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeatured = createAsyncThunk(
  'products/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSpecialOffers = createAsyncThunk(
  'products/fetchSpecialOffers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/offers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
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
        state.categories = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeatured.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSpecialOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.specialOffers = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchSpecialOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;