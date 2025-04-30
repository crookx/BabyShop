import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Button,
  TextField,
  CircularProgress,
  Alert,
  List,
  ListItem,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import { useGetReviewsQuery, useAddReviewMutation } from '../../store/apis/reviewApi';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const Reviews = ({ productId }) => {
  const { user } = useSelector(state => state.auth);
  const { data: reviews, isLoading, error } = useGetReviewsQuery(productId);
  const [addReview, { isLoading: isSubmitting }] = useAddReviewMutation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!rating) {
      setSubmitError('Please select a rating');
      return;
    }

    try {
      await addReview({
        productId,
        rating,
        comment
      }).unwrap();
      
      // Reset form
      setRating(0);
      setComment('');
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit review');
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Reviews ({reviews?.length || 0})
      </Typography>

      {user && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Write a Review
          </Typography>
          <Stack spacing={2}>
            <Rating
              value={rating}
              onChange={(_, value) => setRating(value)}
              size="large"
            />
            <TextField
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              fullWidth
            />
            {submitError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {submitError}
              </Alert>
            )}
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isSubmitting}
              sx={{ alignSelf: 'flex-start' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Stack>
        </Box>
      )}

      <List>
        {reviews?.map((review) => (
          <React.Fragment key={review._id}>
            <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
                <Avatar src={review.user?.avatar} alt={review.user?.name}>
                  {review.user?.name?.charAt(0)}
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1">
                    {review.user?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(review.createdAt), 'PP')}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              </Box>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
        {reviews?.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No reviews yet. Be the first to review this product!
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default Reviews;