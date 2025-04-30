import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetProductsQuery } from '../../store/apis/productApi';
import VirtualizedProductList from './VirtualizedProductList';

const SimilarProducts = ({ product, maxItems = 8 }) => {
  const { data: products = [], isLoading } = useGetProductsQuery({
    category: product.category,
    excludeId: product._id,
    limit: maxItems
  });

  const similarProducts = useMemo(() => 
    products.filter(p => 
      p._id !== product._id && 
      (p.category === product.category || 
       p.brand === product.brand)
    ).slice(0, maxItems)
  , [products, product, maxItems]);

  if (similarProducts.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Similar Products
      </Typography>
      <VirtualizedProductList 
        products={similarProducts}
        loading={isLoading}
        columns={{ xs: 2, sm: 3, md: 4 }}
      />
    </Box>
  );
};

export default React.memo(SimilarProducts);