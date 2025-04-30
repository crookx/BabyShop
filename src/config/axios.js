import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080/api';  // Hardcode for now to ensure consistency
const TIMEOUT = 5000;
const RETRY_DELAY = 1000;
const MAX_RETRIES = 2;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const instance = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

const retryRequest = async (error, retryCount = 0) => {
  const config = error.config;
  
  if (!config || retryCount >= MAX_RETRIES) {
    return Promise.reject(error);
  }

  await sleep(RETRY_DELAY);
  return instance(config);
};

instance.interceptors.request.use(
  config => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.code === 'ERR_NETWORK') {
      console.warn('Network error, attempting retry...');
      return retryRequest(error);
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timed out. Please check your connection.'));
    }

    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error);
      return Promise.reject(new Error('Server error. Please try again later.'));
    }

    // Handle 404 errors
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Product not found'));
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message;
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default instance;