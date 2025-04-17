import React, { memo } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import CategoryCard from './CategoryCard';

const CategoryShowcase = memo(({ categories }) => {
  if (!categories?.length) return null;

  return (
    <Box sx={{ my: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        Shop by Category
      </Typography>
      
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid key={category._id} item sm={6} md={3}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

CategoryShowcase.displayName = 'CategoryShowcase';
export default CategoryShowcase;