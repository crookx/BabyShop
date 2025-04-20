import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qaran.onrender.com/api/products'
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
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      console.log('Special Offers API Response:', response.data);
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
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('Reducer received payload:', action.payload);
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      })
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Featured Products
      .addCase(fetchFeatured.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload.data;
      })
      .addCase(fetchFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Special Offers
      .addCase(fetchSpecialOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.specialOffers = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchSpecialOffers.rejected, (state, action) => {
        state.loading = false;
        state.specialOffers = [];
        state.error = action.payload;
      });
  }
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;