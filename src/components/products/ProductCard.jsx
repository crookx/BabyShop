import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Rating, IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { showNotification } from '../../store/slices/notificationSlice';
import { ROUTES } from '../../config/routes';
import { getAuthData } from '../../utils/auth';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = getAuthData();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const { items: wishlistItems } = useSelector(state => state.wishlist);
  const isInWishlist = wishlistItems.some(item => item._id === product._id);
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!token || !isAuthenticated) {
      dispatch(showNotification({
        message: 'Please login to add items to wishlist',
        type: 'info'
      }));
      navigate(ROUTES.AUTH, { 
        state: { from: location.pathname }
      });
      return;
    }

    try {
      setIsProcessing(true);
      if (isInWishlist) {
        await dispatch(removeFromWishlist(product._id)).unwrap();
        dispatch(showNotification({
          message: 'Removed from wishlist',
          type: 'success'
        }));
      } else {
        await dispatch(addToWishlist(product._id)).unwrap();
        dispatch(showNotification({
          message: 'Added to wishlist',
          type: 'success'
        }));
      }
    } catch (error) {
      dispatch(showNotification({
        message: error.message || 'Failed to update wishlist',
        type: 'error'
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  if (!product) return null;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.images?.[0] || '/images/product-placeholder.jpg'}
            alt={product.name}
            sx={{ objectFit: 'cover' }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              p: 0.5
            }}
          >
            <Tooltip title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
              <IconButton
                size="small"
                onClick={handleWishlistClick}
                disabled={isProcessing}
                sx={{ 
                  color: isInWishlist ? 'error.main' : 'action.active',
                  '&:hover': { color: 'error.main' }
                }}
              >
                {isInWishlist ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontSize: '1rem',
              height: '2.4em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1
            }}
          >
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating 
              value={product.rating || 0} 
              readOnly 
              size="small"
              precision={0.5}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews || 0})
            </Typography>
          </Box>

          <Box sx={{ 
            mt: 'auto',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <Box>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                ${Number(product.price).toFixed(2)}
              </Typography>
              {product.discount > 0 && (
                <Typography 
                  variant="body2" 
                  color="error.main" 
                  sx={{ fontWeight: 'bold' }}
                >
                  {product.discount}% OFF
                </Typography>
              )}
            </Box>
            
            <Tooltip title="Add to Cart">
              <IconButton
                onClick={handleAddToCart}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                <ShoppingCart />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;