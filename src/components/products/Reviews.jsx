import React, { useState } from 'react';
import {
  Box, Typography, Rating, Avatar, 
  Button, TextField, Paper, Stack
} from '@mui/material';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const Reviews = ({ reviews, productId }) => {
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const user = useSelector(state => state.auth.user);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // TODO: Implement review submission
    console.log('Review submitted:', newReview);
  };

  return (
    <Stack spacing={3}>
      {user && (
        <Paper sx={{ p: 2 }} component="form" onSubmit={handleSubmitReview}>
          <Typography variant="h6" gutterBottom>Write a Review</Typography>
          <Rating
            value={newReview.rating}
            onChange={(_, value) => setNewReview({ ...newReview, rating: value })}
            size="large"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Share your experience..."
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit">
            Submit Review
          </Button>
        </Paper>
      )}

      <AnimatePresence>
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2 }}>{review.user.name[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle1">{review.user.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
              <Typography variant="body2">{review.comment}</Typography>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
    </Stack>
  );
};

export default Reviews;