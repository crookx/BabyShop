import React from 'react';
import { Card, CardContent, Box, Skeleton } from '@mui/material';

const ProductSkeleton = () => (
  <Card>
    <Skeleton 
      variant="rectangular" 
      width="100%" 
      height={200}
      animation="wave"
    />
    <CardContent>
      <Skeleton variant="text" width="70%" height={24} />
      <Skeleton variant="text" width="40%" height={20} />
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Skeleton variant="circular" width={36} height={36} />
        <Skeleton variant="circular" width={36} height={36} />
      </Box>
    </CardContent>
  </Card>
);

export default ProductSkeleton;