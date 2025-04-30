import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const ProductCardSkeleton = () => (
  <Card sx={{ height: '100%', position: 'relative' }}>
    <Skeleton variant="rectangular" height={200} animation="wave" />
    <CardContent>
      <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <Skeleton variant="rectangular" width={60} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </Box>
      <Skeleton variant="text" width="60%" />
    </CardContent>
  </Card>
);

export default ProductCardSkeleton;