import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecialOffers } from '../store/slices/productSlice';
import { Grid, Typography, Box, CircularProgress, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const SpecialOffers = () => {
  const dispatch = useDispatch();
  const { specialOffers, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchSpecialOffers());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!specialOffers?.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No special offers available
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} padding={2}>
      {specialOffers.map(offer => (
        <Grid item xs={12} sm={6} md={3} key={offer._id}>
          <Card 
            component={Link} 
            to={`/product/${offer.product._id}`}
            sx={{ 
              textDecoration: 'none',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={offer.product.image || '/placeholder.png'}
              alt={offer.product.name}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {offer.name}
              </Typography>
              <Typography variant="body1">
                {offer.product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Original Price: ${offer.product.price}
              </Typography>
              <Typography variant="h6" color="error">
                Sale Price: ${offer.discountedPrice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SpecialOffers;