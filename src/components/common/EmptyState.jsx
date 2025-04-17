import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const EmptyState = ({ icon, title, description, action }) => {
  return (
    <Paper 
      elevation={0}
      sx={{
        textAlign: 'center',
        py: 8,
        px: 3,
        bgcolor: 'transparent'
      }}
    >
      <Box sx={{ mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      {action}
    </Paper>
  );
};

export default EmptyState;