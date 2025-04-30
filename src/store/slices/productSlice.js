import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const initialState = {
  products: [],
  featured: [],
  specialOffers: [],
  categories: [],
  loading: false,
  error: null,
  lastFetch: null,
  selectedCategory: null,
  filters: {
    price: [0, 1000],
    sort: 'newest',
    ageGroup: 'all',
    page: 1,
    limit: 12
  },
  totalPages: 1,
  currentPage: 1,
  hasMore: true
};

// RTK Query API
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, filters = {} }) => {
        const queryString = new URLSearchParams(filters).toString();
        const endpoint = category ? `/products/category/${category}` : '/products';
        return `${endpoint}${queryString ? `?${queryString}` : ''}`;
      },
      keepUnusedDataFor: 300,
      retry: 3
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      keepUnusedDataFor: 300
    }),
    getFeaturedProducts: builder.query({
      query: () => '/products/featured',
      keepUnusedDataFor: 600
    })
  })
});

// Export hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetFeaturedProductsQuery
} = productApi;

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, filters = {} }, { rejectWithValue }) => {
    try {
      const endpoint = category ? `/products/category/${category}` : '/products';
      const queryString = new URLSearchParams(filters).toString();
      const response = await api.get(`${endpoint}${queryString ? `?${queryString}` : ''}`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products/featured');
      return data.data || []; // Return the data array or empty array if undefined
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSpecialOffers = createAsyncThunk(
  'products/fetchSpecialOffers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products/offers');
      return data.data?.offers || []; // Return offers array or empty array if undefined
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/categories');
      return data.data || []; // Return the data array or empty array if undefined
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.products = [];
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastFetch = Date.now();
        const { products = [], total = 0, isNewSearch } = action.payload || {};
        state.products = isNewSearch ? products : [...state.products, ...products];
        state.hasMore = state.products.length < total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
        state.retryCount = (state.retryCount || 0) + 1;
      })
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch featured products';
        state.featured = [];
      })
      .addCase(fetchSpecialOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.specialOffers = action.payload;
        state.error = null;
      })
      .addCase(fetchSpecialOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch special offers';
        state.specialOffers = [];
      })
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
        state.error = action.payload || 'Failed to fetch categories';
        state.categories = [];
      });
  }
});

export const { clearProducts, setSelectedCategory, updateFilters, resetFilters } = productSlice.actions;
export default productSlice.reducer;