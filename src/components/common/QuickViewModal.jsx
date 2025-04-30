import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  IconButton, 
  Grid, 
  Typography,
  Box,
  Button,
  CircularProgress
} from '@mui.material';
import { 
  Close as CloseIcon, 
  ShoppingCart, 
  RemoveShoppingCart,
  FavoriteBorder, 
  Favorite 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchWishlist } from '../../store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

const QuickViewModal = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { items: cartItems } = useSelector(state => state.cart);
  const { items: wishlistItems } = useSelector(state => state.wishlist);

  const isInCart = cartItems?.some(item => item?.product?._id === product?._id);
  const isInWishlist = wishlistItems?.some(item => item?._id === product?._id);

  const handleCartAction = async () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'cart',
          productId: product._id
        }
      });
      onClose();
      return;
    }

    try {
      setCartLoading(true);
      const response = await api.post('/cart/toggle', { productId: product._id });
      await dispatch(fetchCart());
      toast.success(isInCart ? 'Removed from cart' : 'Added to cart');
    } catch (error) {
      console.error('Cart error:', error);
      toast.error(error?.message || 'Failed to update cart');
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistAction = async () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'wishlist',
          productId: product._id
        }
      });
      onClose();
      return;
    }

    try {
      setWishlistLoading(true);
      const response = await api.post('/wishlist/toggle', { productId: product._id });
      await dispatch(fetchWishlist());
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error(error?.message || 'Failed to update wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperComponent={motion.div}
      PaperProps={{
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3 }
      }}
    >
      <DialogContent sx={{ position: 'relative', p: 3 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product?.image}
              alt={product?.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product?.price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product?.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained"
                startIcon={cartLoading ? null : isInCart ? <RemoveShoppingCart /> : <ShoppingCart />}
                onClick={handleCartAction}
                disabled={cartLoading}
                fullWidth
                sx={{
                  bgcolor: isInCart ? 'grey.200' : 'primary.main',
                  color: isInCart ? 'text.primary' : 'white',
                  '&:hover': {
                    bgcolor: isInCart ? 'grey.300' : 'primary.dark',
                  }
                }}
              >
                {cartLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isInCart ? (
                  'Remove from Cart'
                ) : (
                  'Add to Cart'
                )}
              </Button>
              <Button
                variant="outlined"
                startIcon={wishlistLoading ? null : isInWishlist ? <Favorite /> : <FavoriteBorder />}
                onClick={handleWishlistAction}
                disabled={wishlistLoading}
                fullWidth
                sx={{
                  color: isInWishlist ? 'error.main' : 'inherit',
                  borderColor: isInWishlist ? 'error.main' : 'inherit',
                  '&:hover': {
                    borderColor: isInWishlist ? 'error.dark' : 'inherit',
                    bgcolor: isInWishlist ? 'error.lighter' : 'action.hover'
                  }
                }}
              >
                {wishlistLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isInWishlist ? (
                  'Remove from Wishlist'
                ) : (
                  'Add to Wishlist'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;