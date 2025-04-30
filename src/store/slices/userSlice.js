import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recentlyViewed: [],
  profile: null,
  preferences: {},
  notifications: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRecentlyViewed: (state, action) => {
      state.recentlyViewed = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUser: (state, action) => action.payload,
    clearUser: () => initialState,
  },
});

export const { setRecentlyViewed, setProfile, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;