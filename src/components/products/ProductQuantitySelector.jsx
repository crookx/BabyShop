import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const ProductQuantitySelector = ({ quantity, onChange, max = 99, min = 1 }) => {
  const handleIncrease = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton 
        onClick={handleDecrease} 
        disabled={quantity <= min}
        size="small"
        sx={{ bgcolor: 'action.selected' }}
      >
        <Remove />
      </IconButton>
      
      <Typography 
        sx={{ 
          minWidth: 40, 
          textAlign: 'center',
          userSelect: 'none'
        }}
      >
        {quantity}
      </Typography>

      <IconButton 
        onClick={handleIncrease} 
        disabled={quantity >= max}
        size="small"
        sx={{ bgcolor: 'action.selected' }}
      >
        <Add />
      </IconButton>
    </Box>
  );
};

export default ProductQuantitySelector;