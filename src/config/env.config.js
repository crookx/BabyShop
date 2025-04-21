const config = {
  development: {
    API_URL: 'http://localhost:8080/api',
    SITE_URL: 'http://localhost:3000'
  },
  production: {
    API_URL: 'https://qaran.onrender.com/api',
    SITE_URL: 'https://baby-shop-mcqv.vercel.app'
  }
};

const env = process.env.NODE_ENV || 'development';

export const envConfig = {
  ...config[env],
  ENV: env,
  IS_DEV: env === 'development',
  IS_PROD: env === 'production',
  IMAGE_URL: process.env.REACT_APP_IMAGE_URL || config[env].API_URL + '/images'
};

Object.freeze(envConfig);