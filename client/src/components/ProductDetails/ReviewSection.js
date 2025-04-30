import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Box, Button, Typography, LinearProgress, Select, MenuItem, Grid } from '@mui/material';
import ReviewList from './ReviewList';

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 0, total: 0, distribution: {} });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchReviews();
    fetchStats();
  }, [productId, filter, sort, page]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/product/${productId}`, {
        params: { rating: filter !== 'all' ? filter : undefined, sort, page }
      });
      setReviews(data.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/stats/${productId}`);
      setStats(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const handleHelpful = async (reviewId) => {
    try {
      await axios.post(`/api/reviews/${reviewId}/helpful`);
      fetchReviews();
    } catch (error) {
      console.error('Error marking review helpful:', error);
    }
  };

  const RatingBar = ({ rating, count }) => {
    const percentage = (count / stats.total) * 100 || 0;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography sx={{ minWidth: 60 }}>{rating} stars</Typography>
        <Box sx={{ width: '60%', mr: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={percentage} 
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box>
        <Typography sx={{ minWidth: 60 }}>{count || 0}</Typography>
      </Box>
    );
  };

  if (loading) return <Box>Loading...</Box>;

  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Customer Reviews</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={stats.average} precision={0.1} readOnly />
              <Typography sx={{ ml: 1 }}>
                {stats.average.toFixed(1)} out of 5
              </Typography>
            </Box>
            <Typography sx={{ mb: 2 }}>{stats.total} total ratings</Typography>
            {[5, 4, 3, 2, 1].map(rating => (
              <RatingBar 
                key={rating} 
                rating={rating} 
                count={stats.distribution[rating] || 0} 
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="all">All ratings</MenuItem>
              {[5, 4, 3, 2, 1].map(rating => (
                <MenuItem key={rating} value={rating}>{rating} Stars</MenuItem>
              ))}
            </Select>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              size="small"
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="helpful">Most helpful</MenuItem>
              <MenuItem value="highest">Highest rating</MenuItem>
              <MenuItem value="lowest">Lowest rating</MenuItem>
            </Select>
          </Box>
          <ReviewList 
            reviews={reviews} 
            onHelpful={handleHelpful} 
          />
          {reviews.length > 0 && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={() => setPage(p => p + 1)}
              >
                Load more reviews
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewSection;