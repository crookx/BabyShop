import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategoryDetails = createAsyncThunk(
  'categories/fetchDetails',
  async (slug) => {
    const response = await axios.get(`http://localhost:5000/api/categories/${slug}`);
    return response.data;
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  'categories/fetchProducts',
  async (categoryId) => {
    const response = await axios.get(`http://localhost:5000/api/products`, {
      params: { category: categoryId }
    });
    return response.data;
  }
);

// Add memoized selectors
// Base selector
const selectCategoriesState = state => state.categories;

// Memoized selectors
export const selectCategoryDetails = createSelector(
  [selectCategoriesState],
  (categoriesState) => {
    console.log('Selector state:', categoriesState); // Debug log
    return {
      currentCategory: categoriesState?.currentCategory || null,
      products: categoriesState?.products || [],
      loading: categoriesState?.loading || false,
      error: categoriesState?.error || null
    };
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    currentCategory: null,
    products: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
        console.log('Updating category state:', action.payload);
        state.currentCategory = action.payload;
        state.loading = false;
        console.log('Updated state:', state);
      })
      .addCase(fetchCategoryDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  }
});

export default categorySlice.reducer;