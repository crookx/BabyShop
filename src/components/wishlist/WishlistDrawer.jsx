import React, { useState, useEffect } from 'react';
import { 
  Drawer, Box, Typography, IconButton, List, ListItem, 
  ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction,
  Button, CircularProgress
} from '@mui/material';
import { Close, Delete, ShoppingCart } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlistItem, fetchWishlist } from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const WishlistDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading } = useSelector(state => state.wishlist);
  const [removingId, setRemovingId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);

  const handleRemoveItem = async (productId) => {
    try {
      setRemovingId(productId);
      await dispatch(toggleWishlistItem(productId)).unwrap();
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCartId(productId);
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      await handleRemoveItem(productId);
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCartId(null);
    }
  };

  useEffect(() => {
    if (open) {
      dispatch(fetchWishlist());
    }
  }, [open, dispatch]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: { xs: '100%', sm: 400 },
          p: 2
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">
            Wishlist ({items?.length || 0})
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : !items?.length ? (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Your wishlist is empty
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => {
                onClose();
                navigate('/products');
              }}
              startIcon={<ShoppingCart />}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <List sx={{ flex: 1, overflow: 'auto' }}>
            {items.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ListItem 
                  sx={{ 
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={item.image} 
                      variant="rounded"
                      sx={{ width: 80, height: 80 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="primary">
                          ${item.price}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        onClick={() => handleAddToCart(item._id)}
                        disabled={addingToCartId === item._id}
                        color="primary"
                      >
                        {addingToCartId === item._id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <ShoppingCart />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => handleRemoveItem(item._id)}
                        disabled={removingId === item._id}
                        color="error"
                      >
                        {removingId === item._id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Delete />
                        )}
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              </motion.div>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
};

export default WishlistDrawer;