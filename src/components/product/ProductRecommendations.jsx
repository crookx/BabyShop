import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';  // Updated import
import ProductCard from './ProductCard';

const ProductRecommendations = ({ currentProduct }) => {
  const { data: recommendations, isLoading } = useQuery(
    ['recommendations', currentProduct.id],
    async () => {
      const response = await fetch(`/api/recommendations?productId=${currentProduct.id}`);
      return response.json();
    }
  );

  if (isLoading) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        You May Also Like
      </Typography>
      <Grid container spacing={3}>
        {recommendations?.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductRecommendations;