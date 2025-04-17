import React, { useState } from 'react';
import { Box, Rating, TextField, Button, Avatar, Typography, Divider } from '@mui/material';
import { Star, Image } from '@mui/icons-material';
import { useMutation, useQueryClient } from 'react-query';

const OrderReview = ({ orderId, productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (reviewData) => {
      const formData = new FormData();
      formData.append('rating', reviewData.rating);
      formData.append('comment', reviewData.comment);
      images.forEach(image => formData.append('images', image));

      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: formData
      });
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reviews', productId]);
        setRating(0);
        setComment('');
        setImages([]);
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ rating, comment, orderId, productId });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Rating
        value={rating}
        onChange={(_, value) => setRating(value)}
        precision={0.5}
        size="large"
      />
      <TextField
        multiline
        rows={4}
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        sx={{ mt: 2 }}
      />
      <Button
        component="label"
        startIcon={<Image />}
        sx={{ mt: 2 }}
      >
        Add Photos
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files))}
        />
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading || !rating}
        sx={{ mt: 2, ml: 2 }}
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default OrderReview;