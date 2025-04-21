import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';
import { API_ENDPOINTS } from '../../config/api';

const api = axios.create({
  baseURL: 'https://qaran.onrender.com/api',  // Update to production URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.WISHLIST);
      return response.data?.items || [];
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue({ status: 401, message: 'Please login to view wishlist' });
      }
      return rejectWithValue({ 
        status: error.response?.status,
        message: error.response?.data?.message || 'Failed to fetch wishlist' 
      });
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.WISHLIST, { productId });
      return response.data?.items || [];
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue({ status: 401, message: 'Please login to add to wishlist' });
      }
      return rejectWithValue({ 
        status: error.response?.status,
        message: error.response?.data?.message || 'Failed to add to wishlist'
      });
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_ENDPOINTS.WISHLIST}/${productId}`);
      return response.data?.items || [];
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || 'Failed to remove from wishlist'
      });
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.payload?.status === 401) {
          state.items = [];
        }
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;