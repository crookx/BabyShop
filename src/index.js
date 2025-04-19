import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import './index.css';
import { store } from './store/store.js';
import theme from './theme.js';
import App from './App.jsx';

// Add axios defaults for API calls
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
