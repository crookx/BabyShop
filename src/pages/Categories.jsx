import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchCategories } from '../store/slices/productSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading } = useSelector(state => ({
    categories: state.products?.categories || [],
    loading: state.products?.loading || false
  }));

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Categories
        </Typography>
        
        <Grid container spacing={3}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category?._id}>
                <Box
                  sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-5px)' }
                  }}
                  onClick={() => navigate(`/products?category=${category?.slug}`)}
                >
                  <Box
                    component="img"
                    src={category?.image}
                    alt={category?.name}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 2,
                      mb: 1
                    }}
                  />
                  <Typography variant="h6">{category?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category?.description}
                  </Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" textAlign="center">
                No categories available
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Categories;