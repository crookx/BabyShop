import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Typography, Rating, Button, TextField,
  Stack, Avatar, Divider, LinearProgress, Paper,
  Grid, Alert, Chip
} from '@mui/material';
import { useGetReviewsQuery, useAddReviewMutation } from '../../store/apis/reviewApi';
import { Verified, ThumbUp } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';

const RatingBar = ({ value, count, total }) => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <Typography variant="body2" component="span" sx={{ minWidth: 40 }}>
      {value} ★
    </Typography>
    <LinearProgress
      variant="determinate"
      value={(count / total) * 100}
      sx={{ flex: 1, height: 8, borderRadius: 4 }}
    />
    <Typography variant="body2" component="span" sx={{ minWidth: 40 }}>
      ({count})
    </Typography>
  </Stack>
);

const ReviewForm = ({ productId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview({
        productId,
        rating,
        comment
      }).unwrap();
      setRating(0);
      setComment('');
      onSuccess?.();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Write a Review</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Typography component="legend">Your Rating</Typography>
            <Rating
              value={rating}
              onChange={(_, value) => setRating(value)}
              size="large"
            />
          </Box>
          <TextField
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!rating || !comment.trim() || isLoading}
          >
            Submit Review
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

const Reviews = ({ productId }) => {
  const { user } = useSelector(state => state.auth);
  const { data, isLoading, error } = useGetReviewsQuery(productId);

  const reviews = data?.data?.reviews || [];

  const stats = reviews.reduce((acc, review) => {
    acc.total++;
    acc.avg += review.rating;
    acc.distribution[review.rating] = (acc.distribution[review.rating] || 0) + 1;
    return acc;
  }, { total: 0, avg: 0, distribution: {} });

  stats.avg = stats.total ? (stats.avg / stats.total).toFixed(1) : 0;

  if (isLoading) return <Typography>Loading reviews...</Typography>;
  if (error) return <Alert severity="error">{error.message || 'Failed to load reviews.'}</Alert>;

  return (
    <Box>
      {user ? (
        <ReviewForm productId={productId} />
      ) : (
        <Alert severity="info" sx={{ mb: 3 }}>
          Please log in to write a review.
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Stack alignItems="center" spacing={1}>
            <Typography variant="h3">{stats.avg}</Typography>
            <Rating value={parseFloat(stats.avg)} precision={0.1} readOnly />
            <Typography variant="body2">
              Based on {stats.total} reviews
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={1}>
            {[5, 4, 3, 2, 1].map(value => (
              <RatingBar
                key={value}
                value={value}
                count={stats.distribution[value] || 0}
                total={stats.total}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Stack spacing={2} divider={<Divider />}>
        {reviews.length === 0 ? (
          <Typography color="text.secondary" align="center">
            No reviews yet. Be the first to review this product!
          </Typography>
        ) : (
          reviews.map(review => (
            <Box key={review._id} sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar>
                  {review.user?.name?.[0] || 'A'}
                </Avatar>
                <Box flex={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2">
                        {review.user?.name || 'Anonymous'}
                      </Typography>
                      <Rating value={review.rating} size="small" readOnly sx={{ mt: 0.5 }} />
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {review.verifiedPurchase && (
                        <Chip
                          icon={<Verified fontSize="small" />}
                          label="Verified Purchase"
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      )}
                      <Chip
                        icon={<ThumbUp fontSize="small" />}
                        label={review.helpful}
                        size="small"
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default Reviews;
