import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Skeleton, Alert } from '@mui/material';
import ProductCard from '../products/ProductCard';
import { productApi } from '../../services/api';

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await productApi.getSpecialOffers();
        if (response.status === 'success') {
          setOffers(response.data.offers);
        }
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError('Failed to load special offers');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>Special Offers</Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((skeleton) => (
            <Grid item xs={12} sm={6} md={3} key={skeleton}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!offers?.length) {
    return null;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Special Offers
      </Typography>
      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item xs={12} sm={6} md={3} key={offer._id}>
            <ProductCard
              product={{
                ...offer.product,
                price: offer.originalPrice,
                discountedPrice: offer.discountedPrice,
                discount: offer.discount
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpecialOffers;