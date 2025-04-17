import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  notification: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    }
  }
});

export const { setLoading, showNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;