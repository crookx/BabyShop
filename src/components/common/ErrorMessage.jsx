import React from 'react';
import { Alert, Box } from '@mui/material';

const ErrorMessage = ({ message }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert severity="error">{message || 'An error occurred'}</Alert>
    </Box>
  );
};

export default ErrorMessage;