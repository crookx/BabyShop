import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector(state => state.wishlist);
  const { items: cartItems } = useSelector(state => state.cart);

  const isInWishlist = wishlistItems?.some(item => item.product._id === product._id);
  const isInCart = cartItems?.some(item => item.product._id === product._id);

  const handleClick = () => {
    if (product?._id) {
      navigate(`/product/${product._id}`);
    }
  };

  const handleCartToggle = async () => {
    try {
      await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
      toast.success(isInCart ? 'Removed from cart' : 'Added to cart');
    } catch (error) {
      toast.error(error?.message || 'Failed to update cart');
    }
  };

  const handleWishlistToggle = async () => {
    try {
      await dispatch(toggleWishlist(product._id)).unwrap();
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      toast.error(error?.message || 'Failed to update wishlist');
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ cursor: 'pointer', objectFit: 'contain', p: 1 }}
        onClick={handleClick}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          variant={isInCart ? "outlined" : "contained"}
          startIcon={<ShoppingCart />}
          onClick={handleCartToggle}
        >
          {isInCart ? 'Remove' : 'Add to Cart'}
        </Button>
        <IconButton 
          color="primary" 
          onClick={handleWishlistToggle}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;