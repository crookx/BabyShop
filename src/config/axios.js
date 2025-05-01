import axios from 'axios';
import { API_CONFIG } from './api.config';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const instance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 10000,
  headers: API_CONFIG.headers,
  withCredentials: true
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const retryRequest = async (error, retryCount = 0) => {
  if (retryCount >= MAX_RETRIES || !error.config) {
    return Promise.reject(error);
  }

  await sleep(RETRY_DELAY * Math.pow(2, retryCount));
  console.log(`Retrying request (${retryCount + 1}/${MAX_RETRIES})...`);
  
  return instance({
    ...error.config,
    headers: {
      ...error.config.headers,
      'Cache-Control': 'no-cache'
    }
  });
};

instance.interceptors.request.use(
  config => {
    console.log(`[${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.code === 'ERR_NETWORK') {
      return retryRequest(error);
    }
    
    if (error.response?.status === 401) {
      console.warn('Authentication required');
      // Handle auth error (e.g., redirect to login)
    }

    if (error.response?.status === 403) {
      console.error('CORS or Authorization error:', error.response.data);
    }

    return Promise.reject(error?.response?.data || error);
  }
);

export default instance;