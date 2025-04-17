import React from 'react';
import { Skeleton, Grid, Box } from '@mui/material';

export const ProductSkeleton = () => (
  <Grid container spacing={2}>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Box sx={{ p: 1 }}>
          <Skeleton variant="rectangular" height={200} />
          <Skeleton width="70%" sx={{ mt: 1 }} />
          <Skeleton width="40%" />
          <Skeleton width="20%" />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export const DetailSkeleton = () => (
  <Box sx={{ width: '100%' }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rectangular" height={400} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton height={60} width="80%" />
        <Skeleton height={30} width="40%" sx={{ mt: 2 }} />
        <Skeleton height={100} sx={{ mt: 2 }} />
        <Skeleton height={50} width="30%" sx={{ mt: 2 }} />
      </Grid>
    </Grid>
  </Box>
);