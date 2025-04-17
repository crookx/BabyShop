import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createCache, StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorage('theme-mode', 'light');
  const [direction, setDirection] = useLocalStorage('theme-direction', 'ltr');

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  const cache = React.useMemo(
    () =>
      createCache({
        key: 'mui',
        prepend: true,
        stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [prefixer],
      }),
    [direction]
  );

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const toggleDirection = () => {
    setDirection(prevDir => prevDir === 'ltr' ? 'rtl' : 'ltr');
  };

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={{ ...theme, direction }}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;