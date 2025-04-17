import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewSection = ({ productId, reviews, onAddReview }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  const handleSubmitReview = () => {
    onAddReview(productId, newReview);
    setOpenDialog(false);
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Customer Reviews</Typography>
        <Button variant="outlined" onClick={() => setOpenDialog(true)}>
          Write a Review
        </Button>
      </Box>

      <AnimatePresence>
        {reviews?.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar src={review.user.avatar} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1">{review.user.name}</Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2, mt: 1 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              value={newReview.rating}
              onChange={(event, value) => setNewReview({ ...newReview, rating: value })}
            />
          </Box>
          <TextField
            multiline
            rows={4}
            fullWidth
            label="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitReview} variant="contained">
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewSection;