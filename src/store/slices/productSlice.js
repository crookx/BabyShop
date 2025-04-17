import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      // Convert category name to slug format
      const categorySlug = params.category?.toLowerCase().replace(/\s+/g, '-');
      
      const response = await axios.get('/api/products', { 
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
      const response = await axios.get('/api/products/categories');
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
      const response = await axios.get('/api/products/featured');
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
      const response = await axios.get('/api/products/offers');
      return response.data?.data?.offers || [];
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch special offers';
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
        state.error = action.error.message;
        state.items = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featured = action.payload;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.specialOffers = action.payload;
      });
  }
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;