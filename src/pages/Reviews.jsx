import React from 'react';
import { Box, Container, Typography, Rating, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import ReviewList from '../components/ProductDetails/ReviewList';

const Reviews = () => {
  const reviews = useSelector(state => state.reviews?.reviews?.reviews || []);

  const averageRating = React.useMemo(() => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review?.rating || 0), 0);
    return reviews.length > 0 ? sum / reviews.length : 0;
  }, [reviews]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Customer Reviews</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={averageRating} precision={0.5} readOnly />
          <Typography variant="body1" sx={{ ml: 1 }}>
            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </Typography>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ReviewList reviews={reviews} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reviews;
