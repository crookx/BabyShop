import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../config/axios';

const initialState = {
  list: [],
  currentCategory: null,
  products: [],
  loading: false,
  error: null
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/categories');
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoryDetails = createAsyncThunk(
  'categories/fetchDetails',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/categories/${slug}`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  'categories/fetchProducts',
  async ({ categoryId, filters }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/category/${categoryId}`, { params: filters });
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
        state.currentCategory = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectCategoryDetails = (state) => ({
  currentCategory: state.categories.currentCategory,
  products: state.categories.products,
  loading: state.categories.loading,
  error: state.categories.error
});

export const { updateFilters, resetFilters } = categorySlice.actions;
export default categorySlice.reducer;