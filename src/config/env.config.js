const production = {
  API_URL: 'https://qaran.onrender.com',
  SITE_URL: 'https://qaranbaby.com'
};

const development = {
  API_URL: 'http://localhost:8080/api',
  SITE_URL: 'http://localhost:3000'
};

export const envConfig = process.env.NODE_ENV === 'production' ? production : development;