import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ProductCard from '../products/ProductCard';

const ProductRecommendations = ({ products }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography 
        variant="h4" 
        gutterBottom
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        You Might Also Like
      </Typography>

      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductRecommendations;