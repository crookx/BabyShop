import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#FFF5F7'
    }}>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;