import React, { useState, useEffect } from 'react';
import { API_BASE_URL, getAuthHeader } from '../config/api';
import { Container, Grid, CircularProgress } from '@mui/material';
import ProductGrid from './ProductGrid';
import ProductFilters from './ProductFilters';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`, {
          headers: getAuthHeader()
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProductFilters />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductGrid products={products} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shop;