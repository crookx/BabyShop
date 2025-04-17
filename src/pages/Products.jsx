import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Box, CircularProgress, Alert, Typography } from '@mui/material';
import ProductFilters from '../components/filters/ProductFilters';
import ProductCard from '../components/products/ProductCard';
import SearchBar from '../components/search/SearchBar';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categorySlug = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let endpoint = '/api/products';
        if (categorySlug) {
          endpoint = `/api/products?category=${categorySlug}`;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + endpoint);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products');
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <ProductFilters selectedCategory={categorySlug} />
        </Grid>
        <Grid item xs={12} md={9}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : products.length === 0 ? (
            <Alert severity="info">
              {categorySlug 
                ? `No products found in the "${categorySlug}" category.`
                : 'No products available.'}
            </Alert>
          ) : (
            <>
              <Typography variant="h6" mb={3}>
                {categorySlug 
                  ? `Products in ${categorySlug.replace('-', ' ')} category`
                  : 'All Products'}
              </Typography>
              <Grid container spacing={3}>
                {products.map(product => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;