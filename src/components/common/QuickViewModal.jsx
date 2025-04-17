import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  IconButton, 
  Grid, 
  Typography,
  Box,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductActions } from '../../hooks/useProductActions';

const QuickViewModal = ({ open, onClose, product }) => {
  const { handleAddToCart, handleAddToWishlist } = useProductActions();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperComponent={motion.div}
      PaperProps={{
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3 }
      }}
    >
      <DialogContent sx={{ position: 'relative', p: 3 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product?.image}
              alt={product?.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product?.price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product?.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained"
                onClick={() => handleAddToCart(product?._id)}
                fullWidth
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleAddToWishlist(product?._id)}
                fullWidth
              >
                Add to Wishlist
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;