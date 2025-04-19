import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';
import { API_ENDPOINTS } from '../../config/api';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.CART);
      return response.data?.items || [];
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue({ status: 401, message: 'Please login to continue' });
      }
      return rejectWithValue({ 
        status: error.response?.status,
        message: error.response?.data?.message || 'Failed to fetch cart'
      });
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.CART, { productId, quantity });
      return response.data?.items || [];
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue({ status: 401, message: 'Please login to add items to cart' });
      }
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || 'Failed to add to cart'
      });
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_ENDPOINTS.CART}/${productId}`, { quantity });
      return response.data?.items || [];
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to update quantity',
        status: error.response?.status
      });
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_ENDPOINTS.CART}/${productId}`);
      return response.data?.items || [];
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to remove from cart',
        status: error.response?.status
      });
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.payload?.status === 401) {
          state.items = [];
        }
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;