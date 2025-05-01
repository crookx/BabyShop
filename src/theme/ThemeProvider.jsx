import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

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

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;