import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SpecialOffers from '../components/home/SpecialOffers';
import Newsletter from '../components/common/Newsletter';
import { fetchFeaturedProducts, fetchCategories, fetchSpecialOffers } from '../store/slices/productSlice';
import ScrollableCards from '../components/common/ScrollableCards';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { featured, categories, specialOffers, loading, error } = useSelector((state) => {
    return {
      featured: state?.products?.featured || [],
      categories: state?.products?.categories || [],
      specialOffers: state?.products?.specialOffers || [],
      loading: state?.products?.loading || {
        featured: false,
        categories: false,
        specialOffers: false
      },
      error: state?.products?.error || null
    };
  }, (prev, next) => {
    return JSON.stringify(prev) === JSON.stringify(next);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCategories()),
          dispatch(fetchFeaturedProducts()),
          dispatch(fetchSpecialOffers())
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const visibleCategories = useMemo(() => 
    Array.isArray(categories) ? categories.slice(0, 6) : []
  , [categories]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log('Current state:', { featured, categories, specialOffers });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroBanner />
      <Container maxWidth="xl">
        {featured.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Featured Products</Typography>
            <FeaturedProducts products={featured} />
          </Box>
        )}

        {categories.length > 0 && (
          <Box sx={{ my: 6 }}>
            <Typography variant="h4" gutterBottom>Shop by Category</Typography>
            <ScrollableCards>
              {categories.map((category) => (
                <Box
                  key={category._id}
                  sx={{
                    minWidth: { xs: '200px', sm: '220px' },
                    maxWidth: { xs: '200px', sm: '220px' }
                  }}
                >
                  <Box
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateY(-5px)' }
                    }}
                    onClick={() => {
                      console.log('Category clicked:', category.name);
                      console.log('Navigating to:', `/products?category=${category.name}`);
                      navigate(`/products?category=${category.name}`);
                    }}
                  >
                    <Box
                      component="img"
                      src={category.image}
                      alt={category.name}
                      sx={{
                        width: '100%',
                        height: 160,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mb: 1
                      }}
                    />
                    <Typography align="center">{category.name}</Typography>
                  </Box>
                </Box>
              ))}
            </ScrollableCards>
          </Box>
        )}

        {specialOffers.length > 0 && (
          <Box sx={{ my: 6 }}>
            <Typography variant="h4" gutterBottom>Special Offers</Typography>
            <SpecialOffers offers={specialOffers} />
          </Box>
        )}

        <Box sx={{ my: 8 }}>
          <Newsletter />
        </Box>
      </Container>
    </motion.div>
  );
};

export default Home;