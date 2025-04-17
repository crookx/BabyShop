import React from 'react';
import { Grid, IconButton, Typography, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { Delete, ShoppingCart, Favorite } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { removeFromWishlist } from '../../store/slices/wishlistSlice';

const Wishlist = () => {
  const dispatch = useDispatch();

  return (
    <Grid container spacing={3}>
      {wishlistItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={item.image}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography color="primary">${item.price}</Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => dispatch(addToCart(item))}>
                <ShoppingCart />
              </IconButton>
              <IconButton onClick={() => dispatch(removeFromWishlist(item.id))}>
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Wishlist;