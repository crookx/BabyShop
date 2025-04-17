import React from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeader } from '../../config/api';

const WishlistButton = ({ productId, isInWishlist, onWishlistUpdate }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      navigate('/auth', { 
        state: { 
          from: window.location.pathname,
          returnTo: window.location.pathname
        }
      });
      return;
    }

    try {
      const method = isInWishlist ? 'DELETE' : 'POST';
      const response = await fetch(`${API_BASE_URL}/wishlist`, {
        method,
        headers: getAuthHeader(),
        body: JSON.stringify({ productId })
      });

      if (!response.ok) throw new Error('Wishlist operation failed');
      onWishlistUpdate?.();
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  return (
    <IconButton 
      onClick={handleWishlistClick}
      sx={{ 
        color: isInWishlist ? 'primary.main' : 'grey.500',
        '&:hover': { transform: 'scale(1.1)' }
      }}
    >
      {isInWishlist ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default WishlistButton;