import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, Grid, Typography, Box, Breadcrumbs, Link, 
  CircularProgress, Stack, Chip, Alert, ButtonGroup, 
  TextField, Tooltip, IconButton, Button
} from '@mui/material';
import { 
  ShoppingCart, RemoveShoppingCart, Favorite, FavoriteBorder, 
  Add, Remove, LocalShipping, CheckCircle, Timer
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { addToCart, removeFromCart, fetchCartItems } from '../store/slices/cartSlice';
import { toggleWishlistItem } from '../store/slices/wishlistSlice';
import { fetchProductDetail } from '../store/slices/productDetailSlice';
import RelatedProducts from '../components/products/RelatedProducts';
import ProductTabs from '../components/products/ProductTabs';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { user } = useSelector(state => state.auth);
  const { product, loading, error } = useSelector(state => state.productDetail);
  const { items: cartItems } = useSelector(state => state.cart);
  const { items: wishlistItems = [] } = useSelector(state => state.wishlist);

  const isInCart = cartItems?.some(item => 
    item.product?._id === id || item.productId === id
  );
  const isInWishlist = Array.isArray(wishlistItems) && 
    wishlistItems.some(item => item._id === product?._id);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, user]);

  const handleAuthCheck = () => {
    if (!user) {
      navigate('/auth', { 
        state: { from: location.pathname, returnTo: location.pathname }
      });
      return false;
    }
    return true;
  };

  const handleCartToggle = async () => {
    if (!user) {
      navigate('/auth', { state: { from: location.pathname } });
      return;
    }

    setCartLoading(true);
    try {
      if (isInCart) {
        await dispatch(removeFromCart(product._id));
        toast.success('Removed from cart');
      } else {
        await dispatch(addToCart({ productId: product._id, quantity: 1 }));
        toast.success('Added to cart');
      }
      await dispatch(fetchCartItems()).unwrap();
    } catch (error) {
      toast.error(error?.message || 'Failed to update cart');
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
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

    setWishlistLoading(true);
    try {
      await dispatch(toggleWishlistItem(product._id)).unwrap();
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      toast.error(error?.message || 'Failed to update wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" color="inherit">Home</Link>
          <Link href="/shop" color="inherit">Shop</Link>
          {product.category && (
            <Link href={`/category/${product.category.slug}`} color="inherit">
              {product.category.name}
            </Link>
          )}
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Product Image Section */}
          <Grid item xs={12} md={6}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>

          {/* Product Info Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            
            {/* Status Indicators */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip 
                icon={<CheckCircle />}
                label={product.inStock ? 'In Stock' : 'Out of Stock'}
                color={product.inStock ? 'success' : 'error'}
                size="small"
              />
              {product.isNew && (
                <Chip label="New Arrival" color="primary" size="small" />
              )}
              {product.discount > 0 && (
                <Chip label={`${product.discount}% Off`} color="warning" size="small" />
              )}
            </Stack>

            {/* Price Section */}
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h5" color="primary">
                  ${product.price?.toFixed(2)}
                </Typography>
                {product.discount > 0 && (
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ${(product.price * (1 + product.discount/100)).toFixed(2)}
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Colors:
                </Typography>
                <Stack direction="row" spacing={1}>
                  {product.colors.map((color) => (
                    <Tooltip key={color} title={color}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: color.toLowerCase(),
                          border: '2px solid',
                          borderColor: selectedColor === color ? 'primary.main' : 'grey.300',
                          cursor: 'pointer',
                          '&:hover': { borderColor: 'primary.main' },
                        }}
                        onClick={() => setSelectedColor(color)}
                      />
                    </Tooltip>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Size:
                </Typography>
                <ButtonGroup>
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "contained" : "outlined"}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
            )}

            {/* Quantity Controls */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Quantity:
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <ButtonGroup size="small">
                  <IconButton 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1) setQuantity(val);
                    }}
                    inputProps={{ 
                      min: 1,
                      style: { textAlign: 'center', width: '50px' }
                    }}
                  />
                  <IconButton 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stockQuantity || 10)}
                  >
                    <Add />
                  </IconButton>
                </ButtonGroup>
                <Typography variant="body2" color="text.secondary">
                  {product.stockQuantity || 'Limited'} items available
                </Typography>
              </Stack>
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={cartLoading ? <CircularProgress size={20} /> : isInCart ? <RemoveShoppingCart /> : <ShoppingCart />}
                onClick={handleCartToggle}
                disabled={cartLoading}
                sx={{
                  flex: 1,
                  bgcolor: isInCart ? 'grey.200' : 'primary.main',
                  color: isInCart ? 'text.primary' : 'white',
                  '&:hover': {
                    bgcolor: isInCart ? 'grey.300' : 'primary.dark',
                  }
                }}
              >
                {cartLoading ? 'Processing...' : (isInCart ? 'Remove from Cart' : 'Add to Cart')}
              </Button>

              <Button
                variant="outlined"
                startIcon={isInWishlist ? <Favorite /> : <FavoriteBorder />}
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                sx={{
                  minWidth: 56,
                  color: isInWishlist ? 'error.main' : 'inherit',
                  borderColor: isInWishlist ? 'error.main' : 'inherit',
                  '&:hover': {
                    borderColor: isInWishlist ? 'error.dark' : 'inherit',
                  }
                }}
              >
                {wishlistLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'
                )}
              </Button>
            </Stack>

            {/* Shipping Info */}
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
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
        </Grid>

        {/* Product Tabs */}
        <Box sx={{ mt: 6 }}>
          <ProductTabs product={product} />
        </Box>

        {/* Related Products */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <RelatedProducts 
            categoryId={product?.category?._id}
            currentProductId={product?._id}
          />
        </Box>
      </motion.div>
    </Container>
  );
};

export default ProductDetails;