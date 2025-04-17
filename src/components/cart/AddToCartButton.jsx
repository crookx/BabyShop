import React from 'react';
import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const AddToCartButton = ({ productId, size = 'small' }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size={size}
      startIcon={<ShoppingCart />}
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;