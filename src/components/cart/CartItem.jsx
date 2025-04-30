import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Typography,
  Box
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const CartItem = ({ item, onRemove }) => {
  if (!item?.product) {
    return null;
  }

  const { product, quantity } = item;
  const subtotal = (product.price * quantity).toFixed(2);

  return (
    <ListItem
      sx={{
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={product.image}
          variant="rounded"
          sx={{ width: 80, height: 80 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={product.name}
        secondary={
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Quantity: {quantity}
            </Typography>
            <Typography variant="body2" color="primary">
              ${subtotal}
            </Typography>
          </Box>
        }
        sx={{ ml: 2 }}
      />
      <IconButton 
        edge="end" 
        onClick={onRemove}
        color="error"
        sx={{ ml: 1 }}
      >
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default CartItem;