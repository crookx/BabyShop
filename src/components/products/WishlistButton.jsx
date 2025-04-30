import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '../../store/slices/wishlistSlice';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(({ theme, isinwishlist }) => ({
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: '1.5rem',
    color: isinwishlist === 'true' ? theme.palette.error.main : 'inherit',
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    transform: 'scale(1.1)',
    '& svg': {
      color: isinwishlist === 'true' ? theme.palette.error.dark : theme.palette.error.main,
    }
  },
  '&:active': {
    transform: 'scale(0.95)',
  }
}));

const WishlistButton = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { items, loading } = useSelector(state => state.wishlist);
  const isInWishlist = items.some(item => item._id === productId);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      await dispatch(toggleWishlistItem(productId)).unwrap();
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    }
  };

  return (
    <Tooltip 
      title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      arrow
      placement="top"
      enterDelay={200}
      leaveDelay={200}
    >
      <span>
        <StyledIconButton
          onClick={handleWishlistToggle}
          disabled={loading}
          isinwishlist={isInWishlist.toString()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          size="large"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? <Favorite /> : <FavoriteBorder />}
        </StyledIconButton>
      </span>
    </Tooltip>
  );
};

export default WishlistButton;