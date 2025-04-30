import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import ProductCard from './ProductCard';
import { productApi } from '../../utils/api';

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productApi.getSpecialOffers();
        
        if (response?.data?.data) {
          setOffers(response.data.data);
        } else {
          throw new Error('Invalid data structure received');
        }
      } catch (error) {
        console.error('Error fetching special offers:', error);
        setError(error.message || 'Failed to load special offers');
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Special Offers
        </Typography>
        {offers.length > 0 ? (
          <Grid container spacing={3}>
            {offers.map((offer) => (
              <Grid item xs={12} sm={6} md={3} key={offer._id}>
                <ProductCard product={offer} isOffer />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" py={4}>
            <Typography color="text.secondary">
              No special offers available at the moment
            </Typography>
          </Box>
        )}
      </Box>
    );
  };