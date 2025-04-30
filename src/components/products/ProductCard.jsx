import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Box, Typography, Button, IconButton } from '@mui/material';
import { ShoppingCart, FavoriteBorder, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toggleCart, fetchCartItems } from '../../store/slices/cartSlice';
import { toggleWishlistItem } from '../../store/slices/wishlistSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const { items: cartItems } = useSelector(state => state.cart || { items: [] });
  const { items: wishlistItems } = useSelector(state => state.wishlist || { items: [] });
  const { user } = useSelector(state => state.auth || { user: null });

  const isInCart = cartItems?.some(item => item.productId === product._id);
  const isInWishlist = wishlistItems?.some(item => item._id === product._id);

  const handleClick = () => {
    if (!product?._id) {
      console.error('Invalid product ID:', product);
      return;
    }
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async () => {
    try {
      if (!user) {
        navigate('/auth', { state: { from: location.pathname } });
        return;
      }
      setCartLoading(true);
      await dispatch(toggleCart({ productId: product._id })).unwrap();
      await dispatch(fetchCartItems());
    } catch (error) {
      toast.error(error?.message || 'Failed to update cart');
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistAction = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'wishlist',
          productId: product._id
        }
      });
      return;
    }

    setLoading(true);
    try {
      await dispatch(toggleWishlistItem(product._id)).unwrap();
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      toast.error(error?.message || 'Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <Card>
        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" noWrap>{product.name}</Typography>
          <Typography variant="body1" color="primary" gutterBottom>
            ${product.price?.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={cartLoading}
              fullWidth
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
            <IconButton 
              onClick={handleWishlistAction}
              disabled={loading}
              color={isInWishlist ? 'error' : 'default'}
            >
              {isInWishlist ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default React.memo(ProductCard);