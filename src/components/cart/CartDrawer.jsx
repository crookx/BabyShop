import React, { useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import { Close, Add, Remove } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart, fetchCart } from '../../store/slices/cartSlice';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce((sum, item) => {
    const itemTotal = item.price ? (item.price * (item.quantity || 1)) : 0;
    return sum + itemTotal;
  }, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        <List>
          {items.map(item => (
            <ListItem key={item._id} divider>
              <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover' }} />
                <Box sx={{ flex: 1 }}>
                  <ListItemText 
                    primary={item.name}
                    secondary={`$${item.price}`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
                      <Remove />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
                <Typography>
                  ${item.price ? (item.price * (item.quantity || 1)).toFixed(2) : '0.00'}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Total: ${total ? total.toFixed(2) : '0.00'}</Typography>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleCheckout}
            sx={{ mt: 2 }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;