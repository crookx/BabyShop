import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload._id);
    },
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Action creators
export const { addToWishlist, removeFromWishlist, setWishlistItems, setLoading, setError } = wishlistSlice.actions;

// Async thunks
export const fetchWishlist = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get('/api/wishlist');
    dispatch(setWishlistItems(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addToWishlistAsync = (product) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.post('/api/wishlist', { productId: product._id });
    dispatch(addToWishlist(product));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeFromWishlistAsync = (product) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`/api/wishlist/${product._id}`);
    dispatch(removeFromWishlist(product));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default wishlistSlice.reducer;