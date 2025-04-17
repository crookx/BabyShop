import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import axios from '../config/axios';
import ProductCard from '../components/products/ProductCard';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/auth', { state: { returnTo: '/wishlist' } });
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/wishlist');
        setWishlistItems(response.data.data.products || []);
      } catch (error) {
        console.error('Wishlist fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate, token]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        My Wishlist ({wishlistItems.length})
      </Typography>
      <Grid container spacing={3}>
        {wishlistItems.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard 
              product={product}
              onWishlistUpdate={() => setWishlistItems(prev => 
                prev.filter(item => item._id !== product._id)
              )}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist;