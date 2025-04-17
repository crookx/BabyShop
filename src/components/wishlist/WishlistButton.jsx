import React from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';

const WishlistButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.wishlist);
  const isInWishlist = items.some(item => item._id === productId);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  return (
    <IconButton onClick={handleToggleWishlist} color="primary">
      {isInWishlist ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default WishlistButton;