import React from 'react';
import { 
  Container, 
  Typography, 
  Rating, 
  Avatar, 
  Paper,
  Box,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const ReviewCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const ReviewHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ProductReviews = ({ reviews }) => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customer Reviews
      </Typography>

      {reviews.map((review, index) => (
        <ReviewCard
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ReviewHeader>
            <Avatar src={review.userAvatar} sx={{ mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.userName}
              </Typography>
              <Rating value={review.rating} readOnly size="small" />
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ ml: 'auto' }}
            >
              {review.date}
            </Typography>
          </ReviewHeader>

          <Typography variant="body1" paragraph>
            {review.comment}
          </Typography>

          {review.images && (
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {review.images.map((image, idx) => (
                <motion.img
                  key={idx}
                  src={image}
                  alt={`Review ${idx + 1}`}
                  style={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: 8,
                    objectFit: 'cover'
                  }}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              variant="outlined" 
              size="small"
              sx={{ borderRadius: 20 }}
            >
              Helpful ({review.helpfulCount})
            </Button>
            <Button 
              variant="text" 
              size="small"
              sx={{ borderRadius: 20 }}
            >
              Report
            </Button>
          </Box>
        </ReviewCard>
      ))}
    </Box>
  );
};

export default ProductReviews;