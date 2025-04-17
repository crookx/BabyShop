import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CategoryHero = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        bgcolor: 'primary.light',
        color: 'primary.contrastText',
        py: 6,
        mb: 4
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" gutterBottom>
          Shop by Category
        </Typography>
        <Typography variant="h6">
          Discover our wide range of baby products
        </Typography>
      </Container>
    </Box>
  );
};

export default CategoryHero;