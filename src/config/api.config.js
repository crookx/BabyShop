const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  // Remove the duplicate 'api' in the baseURL
  baseURL: isDevelopment ? 'http://localhost:8080' : 'https://qaran.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
};