import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Pagination,
  CircularProgress,
  Alert
} from '@mui/material';
import ProductFilters from '../components/filters/ProductFilters';
import ProductCard from '../components/products/ProductCard';
import { fetchProducts, clearProducts } from '../store/slices/productSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  console.log('Current Redux State:', useSelector(state => state.products));
  const { items, loading, error, pagination } = useSelector(state => {
    console.log('Raw products state:', state.products);
    return state.products;
  });
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: searchParams.get('priceRange') || '0-1000',
    ageGroup: searchParams.get('ageGroup') || ''
  });
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  useEffect(() => {
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    console.log('Category from URL:', categoryFromUrl);
    
    if (categoryFromUrl) {
      setFilters(prev => ({ 
        ...prev, 
        category: categoryFromUrl,
        priceRange: searchParams.get('priceRange') || '0-1000',
        ageGroup: searchParams.get('ageGroup') || ''
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    console.log('Current filters:', filters);
    if (filters.category) {
      dispatch(fetchProducts({ 
        page, 
        ...filters,
        category: filters.category.toLowerCase().replace(/\s+/g, '-')
      }))
      .then(action => {
        console.log('fetchProducts response:', action.payload);
      });
    }
  }, [dispatch, filters, page]);

  const handleFilterChange = (newFilters) => {
    console.log('Filter change:', newFilters);
    setFilters(newFilters);
    setPage(1);
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shop
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProductFilters 
            filters={filters}
            onChange={handleFilterChange}
          />
        </Grid>
        
        <Grid item xs={12} md={9}>
          {items?.length > 0 ? (
            <>
              <Grid container spacing={2}>
                {items.map(product => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              {pagination.totalPages > 1 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={pagination.totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shop;