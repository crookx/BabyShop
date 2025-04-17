import React from 'react';
import { Grid, Container, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Delete } from '@mui/icons-material';
import styled from '@emotion/styled';

const WishlistCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
`;

const ImageOverlay = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${WishlistCard}:hover & {
    transform: translateY(0);
  }
`;

const WishlistGrid = ({ items, onRemove, onAddToCart }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Typography 
        variant="h4" 
        gutterBottom
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Wishlist ({items.length} items)
      </Typography>

      <Grid container spacing={4}>
        <AnimatePresence>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <WishlistCard
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  style={{ width: '100%', borderRadius: '15px' }}
                />
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                    ${item.price}
                  </Typography>
                </Box>

                <ImageOverlay>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton 
                      color="primary"
                      onClick={() => onAddToCart(item)}
                      sx={{ bgcolor: 'white' }}
                    >
                      <ShoppingCart />
                    </IconButton>
                    <IconButton 
                      color="error"
                      onClick={() => onRemove(item.id)}
                      sx={{ bgcolor: 'white' }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </ImageOverlay>
              </WishlistCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Container>
  );
};

export default WishlistGrid;