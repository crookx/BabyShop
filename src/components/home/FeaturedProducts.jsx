import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, CircularProgress, Container } from '@mui/material';
import ProductCard from '../products/ProductCard';
import { fetchFeatured } from '../../store/slices/productSlice';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featured, loading, error } = useSelector(state => ({
    featured: state.products.featured,
    loading: state.products.loading,
    error: state.products.error
  }));

  useEffect(() => {
    dispatch(fetchFeatured());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!Array.isArray(featured) || featured.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          No featured products available
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Featured Products
        </Typography>
        <Grid container spacing={3}>
          {featured.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product?._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturedProducts;