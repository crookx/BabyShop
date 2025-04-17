import { createTheme } from '@mui/material/styles';

const tokens = {
  colors: {
    primary: {
      main: '#FF6B9C',
      light: '#FF9BBF',
      dark: '#CC557D'
    },
    secondary: {
      main: '#4A90E2',
      light: '#7EB3FF',
      dark: '#2B5A8F'
    },
    background: {
      light: '#FFFFFF',
      dark: '#121212'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24
  }
};

const getTheme = (mode = 'light') => createTheme({
  direction: 'ltr',
  palette: {
    mode: 'light',
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#333333',
      secondary: '#666666'
    }
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    h1: {
      fontWeight: tokens.typography.fontWeights.bold,
      fontSize: '2.5rem'
    },
    h2: {
      fontWeight: tokens.typography.fontWeights.bold,
      fontSize: '2rem'
    }
  },
  shape: {
    borderRadius: tokens.borderRadius.md
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.borderRadius.md,
          textTransform: 'none'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF'
        }
      }
    }
  }
});

export { tokens, getTheme };