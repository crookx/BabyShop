import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { selectCategoryDetails } from '../../store/slices/categorySlice';

const CategoryLanding = () => {
  const { currentCategory } = useSelector(selectCategoryDetails);

  if (!currentCategory) return null;

  return (
    <Box sx={{ py: 4, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/categories" color="inherit">
            Categories
          </Link>
          <Typography color="text.primary">
            {currentCategory.name}
          </Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" gutterBottom>
          {currentCategory.name}
        </Typography>
        {currentCategory.description && (
          <Typography variant="body1" color="text.secondary">
            {currentCategory.description}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default CategoryLanding;