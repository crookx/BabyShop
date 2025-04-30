import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  CircularProgress
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { removeFromCart, fetchCartItems } from '../../store/slices/cartSlice';
import CartItem from './CartItem';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], totalAmount = 0, loading } = useSelector(state => state.cart);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, isOpen]);

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const validItems = items.filter(item => item?.product && item.product._id);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: { xs: '100%', sm: 400 },
          p: 2
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Shopping Cart ({validItems.length})</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : validItems.length > 0 ? (
          <>
            <List sx={{ flex: 1, overflow: 'auto' }}>
              {validItems.map((item) => (
                <CartItem 
                  key={item.product._id}
                  item={item}
                  onRemove={() => handleRemoveItem(item.product._id)}
                />
              ))}
            </List>
            
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="h6" gutterBottom>
                Total: ${totalAmount?.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onClose}
                href="/checkout"
                sx={{ mt: 1 }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => {
                onClose();
                navigate('/products');
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;