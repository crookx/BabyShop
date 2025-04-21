const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  baseURL: isDevelopment ? 'http://localhost:5000/api' : 'https://qaran.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
};