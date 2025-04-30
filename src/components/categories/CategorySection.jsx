import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import CategoryCard from './CategoryCard';

const CategorySection = () => {
  const { categories = [] } = useSelector(state => state.products);

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={3} key={category._id}>
          <CategoryCard category={category} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorySection;