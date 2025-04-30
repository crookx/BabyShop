import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeatured } from '../store/slices/productSlice';
import ProductCard from './ProductCard';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featured, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchFeatured());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!featured?.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No featured products available
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} padding={2}>
      {featured.map(product => (
        <Grid item xs={12} sm={6} md={3} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};