import { createSlice } from '@reduxjs/toolkit';
import { getAuthData } from '../../utils/auth';

const { token, user } = getAuthData();

const initialState = {
  isAuthenticated: !!token,
  user: user || null,
  token: token || null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;