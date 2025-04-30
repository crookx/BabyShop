import { createSlice } from '@reduxjs/toolkit';

const MAX_COMPARE_ITEMS = 4;

const compareSlice = createSlice({
  name: 'compare',
  initialState: {
    items: [],
    error: null
  },
  reducers: {
    addToCompare: (state, action) => {
      if (state.items.length >= MAX_COMPARE_ITEMS) {
        state.error = 'Maximum 4 items can be compared';
        return;
      }
      if (!state.items.find(item => item._id === action.payload._id)) {
        state.items.push(action.payload);
        state.error = null;
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.error = null;
    },
    clearCompare: (state) => {
      state.items = [];
      state.error = null;
    }
  }
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;