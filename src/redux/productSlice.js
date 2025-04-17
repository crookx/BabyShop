import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    try {
      const response = await productApi.getCategories();
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async () => {
    try {
      const response = await productApi.getFeatured();
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }
);

export const fetchSpecialOffers = createAsyncThunk(
  'products/fetchOffers',
  async () => {
    try {
      const response = await productApi.getSpecialOffers();
      return response.data;
    } catch (error) {
      console.error('Error fetching special offers:', error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    featuredProducts: [],
    specialOffers: [],
    loading: false,
    error: null,
  },
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
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSpecialOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.specialOffers = action.payload;
      })
      .addCase(fetchSpecialOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;