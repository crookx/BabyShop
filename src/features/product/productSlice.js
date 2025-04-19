import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  }
);

export const fetchFeatured = createAsyncThunk(
  'products/fetchFeatured',
  async () => {
    const response = await axios.get(`${API_URL}/products/featured`);
    return response.data;
  }
);

export const fetchOffers = createAsyncThunk(
  'products/fetchOffers',
  async () => {
    const response = await axios.get(`${API_URL}/products/offers`);
    return response.data;
  }
);

// ...existing code...