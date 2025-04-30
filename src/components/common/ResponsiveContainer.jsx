import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useResizeObserver } from '../../utils/performanceUtils';

const ResponsiveContainer = ({ 
  children, 
  minHeight = '100vh',
  maxWidth = 'xl',
  spacing = { xs: 1, sm: 2, md: 3 }
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight,
        width: '100%',
        maxWidth: theme.breakpoints.values[maxWidth],
        margin: '0 auto',
        padding: spacing,
        transition: 'padding 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing,
        '& > *': {
          flexGrow: 1
        }
      }}
    >
      {children}
    </Box>
  );
};

export default React.memo(ResponsiveContainer);