import React, { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  IconButton, 
  Button,
  Grid,
  TextField,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { useDebouncedCallback } from '../../utils/performanceUtils';

const CartItem = React.memo(({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = useDebouncedCallback((newQuantity) => {
    onUpdateQuantity(item.id, newQuantity);
  }, 300);

  const variant = item.variant ? `${item.variant.color} - ${item.variant.size}` : '';
  const price = item.variant?.price || item.price;

  return (
    <Card sx={{ display: 'flex', mb: 2, p: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 100, objectFit: 'cover' }}
        image={item.image}
        alt={item.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, ml: 2 }}>
        <Typography variant="h6">{item.name}</Typography>
        {variant && (
          <Typography variant="body2" color="text.secondary">
            {variant}
          </Typography>
        )}
        <Typography variant="body1" color="primary">
          ${price.toFixed(2)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton size="small" onClick={() => handleQuantityChange(item.quantity - 1)}>
            <Remove />
          </IconButton>
          <TextField
            size="small"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
            sx={{ width: 60, mx: 1 }}
            inputProps={{ min: 1, style: { textAlign: 'center' } }}
          />
          <IconButton size="small" onClick={() => handleQuantityChange(item.quantity + 1)}>
            <Add />
          </IconButton>
          <IconButton color="error" onClick={() => onRemove(item.id)} sx={{ ml: 'auto' }}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
});

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const { totalItems, subtotal } = useMemo(() => {
    return cartItems.reduce((acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      subtotal: acc.subtotal + (item.variant?.price || item.price) * item.quantity
    }), { totalItems: 0, subtotal: 0 });
  }, [cartItems]);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
          />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 2, position: 'sticky', top: 24 }}>
          <Typography variant="h6" gutterBottom>Order Summary</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Items ({totalItems}):</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Button 
            variant="contained" 
            fullWidth 
            size={isMobile ? 'large' : 'medium'}
          >
            Proceed to Checkout
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;