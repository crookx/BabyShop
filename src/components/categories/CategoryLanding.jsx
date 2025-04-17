import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCategoryDetails } from '../../store/slices/categorySlice';

const CategoryLanding = () => {
  const { currentCategory } = useSelector(selectCategoryDetails);
  console.log('CategoryLanding render:', currentCategory); // Add this line

  if (!currentCategory) {
    console.log('No category data available'); // Add this line
    return null;
  }

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentCategory.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 300,
        display: 'flex',
        alignItems: 'center',
        mb: 4
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h2" component="h1" color="white" gutterBottom>
          {currentCategory.name}
        </Typography>
        <Typography variant="h5" color="white">
          {currentCategory.description}
        </Typography>
      </Container>
    </Box>
  );
};

export default React.memo(CategoryLanding);