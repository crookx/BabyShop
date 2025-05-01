import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MuiConfig = ({ children }) => {
  const [mode] = useLocalStorage('theme-mode', 'light');

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#FF6B9C',
        light: '#FF9BC2',
        dark: '#FF3B7C',
        contrastText: '#fff',
      },
      secondary: {
        main: '#4ECDC4',
        light: '#71D7D0',
        dark: '#3DBEB6',
        contrastText: '#fff',
      },
      background: {
        default: mode === 'light' ? '#FAFAFA' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#333333' : '#FFFFFF',
        secondary: mode === 'light' ? '#666666' : '#B3B3B3',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '50px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === 'light' ? '#FAFAFA' : '#121212',
            scrollBehavior: 'smooth',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiConfig;