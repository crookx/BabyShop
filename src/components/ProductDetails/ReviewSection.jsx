import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, LinearProgress, Select, MenuItem, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import ReviewList from './ReviewList';
import { toast } from 'react-toastify';

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 0, total: 0, distribution: {} });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${productId}`, {
        params: { 
          rating: filter !== 'all' ? filter : undefined, 
          sort, 
          page 
        }
      });
      
      // Ensure we have a valid array of reviews
      const reviewsData = data?.data?.reviews || [];
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
      toast.error('Failed to load reviews');
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/stats/${productId}`);
      setStats({
        average: data?.data?.average || 0,
        total: data?.data?.total || 0,
        distribution: data?.data?.distribution || {}
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ average: 0, total: 0, distribution: {} });
      toast.error('Failed to load review statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
      fetchStats();
    }
  }, [productId, filter, sort, page]);

  const handleHelpful = async (reviewId) => {
    try {
      await axios.post(`/api/reviews/${reviewId}/helpful`);
      fetchReviews();
      toast.success('Thanks for your feedback!');
    } catch (error) {
      console.error('Error marking review helpful:', error);
      toast.error('Failed to mark review as helpful');
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Typography variant="h5">Reviews</Typography>
      <Box>
        <Rating value={stats.average} readOnly />
        <Typography>{stats.total} reviews</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="5">5 Stars</MenuItem>
            <MenuItem value="4">4 Stars</MenuItem>
            <MenuItem value="3">3 Stars</MenuItem>
            <MenuItem value="2">2 Stars</MenuItem>
            <MenuItem value="1">1 Star</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Select value={sort} onChange={handleSortChange}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="highest">Highest Rating</MenuItem>
            <MenuItem value="lowest">Lowest Rating</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <ReviewList 
        reviews={reviews} 
        onHelpful={handleHelpful} 
        onPageChange={handlePageChange} 
        currentPage={page} 
        totalPages={Math.ceil(stats.total / 10)} 
      />
    </Box>
  );
};

export default ReviewSection;