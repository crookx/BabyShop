import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  priceRange: [0, 1000],
  ageGroup: '',
  sortBy: 'newest',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setAgeGroup: (state, action) => {
      state.ageGroup = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const { 
  setCategory, 
  setPriceRange, 
  setAgeGroup, 
  setSortBy, 
  setSearchQuery, 
  resetFilters 
} = filterSlice.actions;

export default filterSlice.reducer;