import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Box, Typography } from '@mui/material';
import FilterSidebar from '../components/shop/FilterSidebar';
import CategoryProducts from '../components/categories/CategoryProducts';
import { fetchProducts, setSelectedCategory } from '../store/slices/productSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { selectedCategory, filters } = useSelector(state => state.products);

  useEffect(() => {
    const categorySlug = searchParams.get('category');
    if (categorySlug) {
      // If category changed, update selected category
      if (!selectedCategory || selectedCategory.slug !== categorySlug) {
        dispatch(setSelectedCategory({ slug: categorySlug }));
      }
    } else {
      dispatch(setSelectedCategory(null));
    }
    
    // Fetch products with current filters
    dispatch(fetchProducts({
      category: categorySlug,
      filters
    }));
  }, [dispatch, searchParams]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterSidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box mb={3}>
            <Typography variant="h5">
              {selectedCategory ? selectedCategory.name : 'All Products'}
            </Typography>
          </Box>
          <CategoryProducts />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shop;