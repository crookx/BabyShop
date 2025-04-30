import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress, Alert, Container } from '@mui/material';
import CategoryCard from './CategoryCard';
import { productApi } from '../../utils/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productApi.getCategories();
        if (response?.data?.data) {
          setCategories(response.data.data);
        } else {
          throw new Error('Invalid data structure received');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error.message || 'Failed to load categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          All Categories
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Categories;