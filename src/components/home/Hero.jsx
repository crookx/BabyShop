import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 8,
        mb: 4
      }}
    >
      <Container>
        <Box sx={{ maxWidth: 'sm', mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Qaran
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Discover our amazing collection of products
          </Typography>
          <Button
            component={Link}
            to="/shop"
            variant="contained"
            color="secondary"
            size="large"
          >
            Shop Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;