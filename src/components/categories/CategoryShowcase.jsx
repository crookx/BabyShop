import React, { memo } from 'react';
import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import CategoryCard from './CategoryCard';

const CategoryShowcase = memo(({ categories, loading, error }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!categories?.length) {
    return (
      <Box sx={{ my: 4 }}>
        <Alert severity="info">No categories available.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 8 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        textAlign="center" 
        sx={{ mb: 4 }}
      >
        Shop by Category
      </Typography>
      
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid key={category._id} item xs={12} sm={6} md={3}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

CategoryShowcase.displayName = 'CategoryShowcase';
export default CategoryShowcase;