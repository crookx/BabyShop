import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { fetchProducts } from '../../store/slices/productSlice';

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ sort: 'newest', limit: 8 }));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          New Arrivals
        </Typography>
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default NewArrivals;