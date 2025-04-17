import React from 'react';
import { Box } from '@mui/material';
import ProductCard from '../products/ProductCard';
import ScrollableCards from '../common/ScrollableCards';

const FeaturedProducts = ({ products }) => {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <ScrollableCards>
      {products.map((product) => (
        <Box 
          key={product._id} 
          sx={{ 
            minWidth: { xs: '280px', sm: '300px' },
            maxWidth: { xs: '280px', sm: '300px' }
          }}
        >
          <ProductCard product={product} />
        </Box>
      ))}
    </ScrollableCards>
  );
};

export default FeaturedProducts;