import React from 'react';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Skeleton variant="rectangular" height={300} />
            <Skeleton width="60%" sx={{ mt: 1 }} />
            <Skeleton width="40%" sx={{ mt: 1 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!products?.length && !loading) {
    return null;
  }

  if (!products?.length) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No products found matching your criteria
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;