import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SpecialOffers from '../components/home/SpecialOffers';
import Categories from '../components/home/Categories';
import { fetchCategories, fetchFeatured, fetchSpecialOffers } from '../features/products/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { featured, categories, specialOffers, loading } = useSelector(state => ({
    featured: state.products.featured || [],
    categories: state.products.categories || [],
    specialOffers: state.products.specialOffers || [],
    loading: state.products.loading
  }));

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCategories()),
          dispatch(fetchFeatured()),
          dispatch(fetchSpecialOffers())
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <HeroBanner />
      <Container maxWidth="xl">
        {featured?.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Featured Products</Typography>
            <FeaturedProducts products={featured} />
          </Box>
        )}
        
        {categories?.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Shop by Category</Typography>
            <Categories categories={categories} />
          </Box>
        )}
        
        {specialOffers?.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Special Offers</Typography>
            <SpecialOffers offers={specialOffers} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Home;