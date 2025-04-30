import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import ErrorBoundary from '../common/ErrorBoundary';
import ProductCard from './ProductCard';
import ProductSkeleton from '../common/ProductSkeleton';
import VirtualizedGrid from '../common/VirtualizedGrid';

const ProductList = ({ 
  products = [], 
  loading, 
  error, 
  hasMore, 
  onLoadMore 
}) => {
  const renderProduct = useCallback((product) => (
    <ErrorBoundary>
      <ProductCard product={product} />
    </ErrorBoundary>
  ), []);

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (loading && !products.length) {
    return (
      <VirtualizedGrid
        items={Array(12).fill(null)}
        renderItem={() => <ProductSkeleton />}
      />
    );
  }

  return (
    <Box sx={{ height: 'calc(100vh - 64px)' }}>
      <VirtualizedGrid
        items={products}
        renderItem={renderProduct}
        overscan={5}
        onReachEnd={() => {
          if (hasMore && !loading) {
            onLoadMore?.();
          }
        }}
      />
    </Box>
  );
};

export default React.memo(ProductList);