import React, { useState, useCallback } from 'react';
import { 
  Box, Grid, Typography, Button, Divider, Alert, 
  Skeleton, CircularProgress, Stack, Chip, Rating, Tabs, Tab 
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder, LocalShipping, Timer } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';
import { toggleWishlistItem } from '../../store/slices/wishlistSlice';
import ImageGallery from './ImageGallery';
import VariantSelector from './VariantSelector';
import { toast } from 'react-toastify';
import SimilarProducts from './SimilarProducts';
import { useNavigate, useLocation } from 'react-router-dom';
import Reviews from './Reviews';
import QASection from './QASection';

const ProductDetails = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [error, setError] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const { items: cartItems } = useSelector(state => state.cart || { items: [] });
  const { items: wishlistItems } = useSelector(state => state.wishlist || { items: [] });
  const { user } = useSelector(state => state.auth || { user: null });

  const isInCart = cartItems?.some(item => item.productId === productData?._id);
  const isInWishlist = wishlistItems?.some(item => item._id === productData?._id);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Add a small delay to allow tab animation
    setTimeout(() => {
      window.scrollTo({
        top: window.scrollY + 1,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleCartAction = async () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'cart',
          productId: productData._id
        }
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      if (isInCart) {
        await dispatch(removeFromCart(productData._id)).unwrap();
        toast.success('Removed from cart');
      } else {
        await dispatch(addToCart({
          productId: productData._id,
          quantity: 1
        })).unwrap();
        toast.success('Added to cart');
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to update cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistAction = async () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'wishlist',
          productId: productData._id
        }
      });
      return;
    }

    setIsTogglingWishlist(true);
    try {
      await dispatch(toggleWishlistItem(productData._id)).unwrap();
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      toast.error(error?.message || 'Failed to update wishlist');
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  if (!productData) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ImageGallery images={productData.images || [productData.image]} />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          {productData.name}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip 
            label={productData.inStock ? 'In Stock' : 'Out of Stock'}
            color={productData.inStock ? 'success' : 'error'}
            size="small"
          />
          {productData.isNew && (
            <Chip label="New Arrival" color="primary" size="small" />
          )}
        </Stack>

        <Box sx={{ mb: 2 }}>
          <Rating value={productData.rating || 0} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({productData.reviewCount || 0} reviews)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h5" color="primary">
            ${productData.price?.toFixed(2)}
          </Typography>
          {productData.discount > 0 && (
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ textDecoration: 'line-through' }}
            >
              ${(productData.price * (1 + productData.discount/100)).toFixed(2)}
            </Typography>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {productData.variants?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <VariantSelector
              variants={productData.variants}
              onVariantSelect={setSelectedVariant}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={isAddingToCart ? <CircularProgress size={20} /> : <ShoppingCart />}
            onClick={handleCartAction}
            disabled={isAddingToCart || !productData.inStock}
            fullWidth
          >
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleWishlistAction}
            disabled={isTogglingWishlist}
            color={isInWishlist ? "error" : "primary"}
          >
            {isTogglingWishlist ? (
              <CircularProgress size={20} />
            ) : isInWishlist ? (
              <Favorite />
            ) : (
              <FavoriteBorder />
            )}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 3 }}>
          <Stack spacing={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <LocalShipping color="primary" />
              <Typography variant="body2">
                Free shipping on orders over $50
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Timer color="primary" />
              <Typography variant="body2">
                Delivery within 3-5 business days
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Description" />
            <Tab label={`Reviews (${productData.reviewCount || 0})`} />
            <Tab label="Questions & Answers" />
          </Tabs>
        </Box>
        <Box sx={{ py: 3 }}>
          {activeTab === 0 && (
            <>
              <Typography paragraph>
                {productData.description}
              </Typography>
              {productData.specifications && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Specifications:
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <Grid item xs={6} key={key}>
                        <Typography variant="body2" color="text.secondary">
                          {key}
                        </Typography>
                        <Typography variant="body1">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </>
          )}
          {activeTab === 1 && (
            <Reviews productId={productData._id} />
          )}
          {activeTab === 2 && (
            <QASection productId={productData._id} />
          )}
        </Box>
      </Grid>

      {productData._id && (
        <Grid item xs={12}>
          <SimilarProducts product={productData} />
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(ProductDetails);