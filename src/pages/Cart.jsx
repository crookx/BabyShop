import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Grid, Card, CardContent, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { fetchCart, updateCartQuantity, removeFromCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading, error } = useSelector(state => state.cart);
  
  useEffect(() => {
    const loadCart = async () => {
      try {
        await dispatch(fetchCart()).unwrap();
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };
    loadCart();
  }, [dispatch]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity > 0) {
      try {
        await dispatch(updateCartQuantity({ productId: itemId, quantity: newQuantity })).unwrap();
      } catch (err) {
        console.error('Failed to update quantity:', err);
      }
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  // Only calculate total for items with valid products
  const calculateTotal = () => {
    return items
      .filter(item => item.product)
      .reduce((total, item) => total + (item.product.price * item.quantity), 0)
      .toFixed(2);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Show empty cart message when no valid items
  const validItems = items.filter(item => item.product);
  if (validItems.length === 0) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5">Your cart is empty</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>Shopping Cart ({validItems.length} items)</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {validItems.map((item) => (
            <Card key={item.product._id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      style={{ width: '100%', maxWidth: '100px' }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <Typography color="text.secondary">
                      ${item.product.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Box display="flex" alignItems="center">
                      <IconButton 
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton 
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton 
                    onClick={() => handleRemoveItem(item.product._id)} 
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent="space-between">
                  <Typography>Subtotal:</Typography>
                  <Typography>${calculateTotal()}</Typography>
                </Grid>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;