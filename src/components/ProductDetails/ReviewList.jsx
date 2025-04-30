import React from 'react';
import {
  List,
  ListItem,
  Box,
  Typography,
  Rating,
  Chip,
  IconButton,
  Divider,
  Pagination
} from '@mui/material';
import { AccountCircle, ThumbUp, Verified } from '@mui/icons-material';

const ReviewList = ({ reviews = [], onHelpful, onPageChange, currentPage, totalPages }) => {
  if (!reviews.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">No reviews yet</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <List>
        {reviews.map((review) => (
          <React.Fragment key={review._id}>
            <ListItem sx={{ display: 'block', py: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {review.user?.avatar ? (
                    <img 
                      src={review.user.avatar} 
                      alt={review.user.name} 
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                  ) : (
                    <AccountCircle sx={{ width: 40, height: 40 }} />
                  )}
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="subtitle2">
                      {review.user?.name || 'Anonymous'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                {review.verifiedPurchase && (
                  <Chip
                    icon={<Verified fontSize="small" />}
                    label="Verified Purchase"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ ml: 2 }}
                  />
                )}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={review.rating} readOnly size="small" />
                <IconButton 
                  size="small" 
                  onClick={() => onHelpful(review._id)}
                  sx={{ ml: 'auto' }}
                >
                  <ThumbUp fontSize="small" />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {review.helpful}
                  </Typography>
                </IconButton>
              </Box>
              
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={(_, page) => onPageChange(page)} 
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ReviewList;