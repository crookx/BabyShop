import React from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import api from '../../config/axios';
import { API_ENDPOINTS } from '../../config/api.config';

const WishlistButton = ({ productId, size = 'medium' }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item._id === productId);

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(productId)).unwrap();
      } else {
        await dispatch(addToWishlist(productId)).unwrap();
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    }
  };

  return (
    <IconButton
      size={size}
      onClick={handleToggleWishlist}
      sx={{
        color: isInWishlist ? 'error.main' : 'action.active',
        '&:hover': {
          color: 'error.main',
          transform: 'scale(1.1)'
        },
        transition: 'all 0.2s ease'
      }}
    >
      {isInWishlist ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default WishlistButton;