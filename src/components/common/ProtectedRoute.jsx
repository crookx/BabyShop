import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useSelector(state => state.auth);

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: 'calc(100vh - 128px)', // Account for navbar and footer
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 8 // Add top margin to account for navbar
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // Make sure this matches your AuthPage route
    return (
      <Navigate 
        to="/auth" 
        state={{ 
          from: location.pathname,
          action: location.state?.action,
          productId: location.state?.productId
        }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;