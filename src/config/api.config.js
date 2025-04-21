const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  baseURL: isDevelopment ? 'http://localhost:8080' : 'https://qaran.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
};