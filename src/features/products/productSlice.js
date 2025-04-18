import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/products'
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
      const response = await api.get('/categories');
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
      const response = await api.get('/featured');
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
      const response = await api.get('/offers');
      console.log('Special Offers Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Special Offers Error:', error);
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
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload.data;
      })
      .addCase(fetchSpecialOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        console.log('Special Offers Reducer:', action.payload);
        state.specialOffers = action.payload.data || [];
        state.loading = false;
      })
      .addCase(fetchSpecialOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;