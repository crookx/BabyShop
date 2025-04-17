import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Badge,
  Button,
  Divider,
  TextField,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Add this import

const Cart = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth(); // Get current user

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          borderBottom: 1,
          borderColor: 'divider',
          pb: 2
        }}>
          <Box>
            <Typography variant="h6">My Shopping Cart</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {user?.name || user?.email}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List>
          {cart.map((item) => (
            <ListItem key={item._id} divider>
              <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                <Avatar
                  src={item.image}
                  alt={item.name}
                  variant="rounded"
                  sx={{ width: 80, height: 80 }}
                />
                <Box sx={{ flex: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="medium">
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="primary">
                        ${item.price.toFixed(2)}
                      </Typography>
                    }
                  />
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    mt: 1 
                  }}>
                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > 0) updateQuantity(item._id, value);
                      }}
                      inputProps={{ min: 1 }}
                      sx={{ width: 60 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>

        {cart.length > 0 ? (
          <Box sx={{ mt: 3 }}>
            <Divider />
            <Box sx={{ mt: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>${cartTotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ${cartTotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              href="/checkout"
            >
              Proceed to Checkout (${cartTotal.toFixed(2)})
            </Button>
          </Box>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            mt: 4,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 1
          }}>
            <Typography variant="h6" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add items to start shopping
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;