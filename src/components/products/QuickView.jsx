import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Grid, Typography, Box, Button, Rating, Chip, CircularProgress, Tooltip } from '@mui/material';
import { Close, ShoppingCart, RemoveShoppingCart, FavoriteBorder, Favorite } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, fetchCartItems } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';

const QuickView = ({ 
  open, 
  onClose, 
  product,
  onAddToCart,
  cartLoading = false,
  isInCart,
  onToggleWishlist,
  wishlistLoading = false,
  isInWishlist,
  loading = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleCartAction = () => {
    if (onAddToCart) {
      onAddToCart();
    }
  };

  const handleProductClick = () => {
    if (!location.pathname.includes('/product/')) {
      navigate(`/product/${product.id}`);
    }
  };

  if (!product && loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img 
              src={product?.image} 
              alt={product?.name}
              style={{ width: '100%', height: 'auto' }}
              onClick={handleProductClick}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ${product?.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product?.description}
            </Typography>

            <Box display="flex" gap={2}>
              <Tooltip title={isInCart ? "Remove from Cart" : "Add to Cart"}>
                <span>
                  <Button
                    variant="contained"
                    startIcon={cartLoading ? undefined : isInCart ? <RemoveShoppingCart /> : <ShoppingCart />}
                    onClick={handleCartAction}
                    disabled={cartLoading || undefined}
                    fullWidth
                    sx={{
                      bgcolor: isInCart ? 'grey.200' : 'primary.main',
                      color: isInCart ? 'text.primary' : 'white',
                      '&:hover': {
                        bgcolor: isInCart ? 'grey.300' : 'primary.dark',
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'action.disabledBackground',
                        color: 'action.disabled'
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
                </span>
              </Tooltip>
              <Tooltip title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
                <span>
                  <Button
                    variant="outlined"
                    startIcon={wishlistLoading ? undefined : isInWishlist ? <Favorite /> : <FavoriteBorder />}
                    onClick={onToggleWishlist}
                    disabled={wishlistLoading || undefined}
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
                </span>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;