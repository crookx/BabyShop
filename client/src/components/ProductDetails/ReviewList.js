import React from 'react';
import {
  List,
  ListItem,
  Box,
  Typography,
  Rating,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const ReviewList = ({ reviews, onHelpful }) => {
  return (
    <List>
      {reviews.map((review) => (
        <React.Fragment key={review._id}>
          <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={review.rating} readOnly size="small" />
                  {review.verifiedPurchase && (
                    <Chip
                      icon={<VerifiedUserIcon />}
                      label="Verified Purchase"
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  By {review.user?.name} on {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <IconButton 
                onClick={() => onHelpful(review._id)}
                size="small"
              >
                <ThumbUpIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {review.helpful}
                </Typography>
              </IconButton>
            </Box>
            <Typography variant="body1">
              {review.comment}
            </Typography>
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ReviewList;