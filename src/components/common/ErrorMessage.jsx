import React from 'react';
import { Box, Alert, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

const ErrorMessage = ({ message, onRetry }) => (
  <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
    <Alert 
      severity="error"
      action={onRetry && (
        <Button
          color="inherit"
          size="small"
          startIcon={<Refresh />}
          onClick={onRetry}
        >
          Retry
        </Button>
      )}
    >
      {message}
    </Alert>
  </Box>
);

export default ErrorMessage;