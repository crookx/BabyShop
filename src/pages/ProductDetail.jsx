import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, 
  Grid, 
  Typography, 
  Button,
  Rating
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const product = useSelector(state => 
    state.products.featuredProducts.find(p => p._id === id)
  );

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ productId: product._id, quantity: quantity })).unwrap();
    } catch (error) {
      console.error('Failed to add item to cart: ', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Rating value={product.rating} readOnly />
          <Typography variant="h5" color="primary" sx={{ my: 2 }}>
            ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          <Button 
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            size="large"
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;