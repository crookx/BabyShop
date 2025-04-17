import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';
import { formatCurrency } from '../utils/format';
import WishlistButton from './products/WishlistButton';

const ProductGrid = ({ products }) => {
  if (!products?.length) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h6" align="center" color="text.secondary">
          No products found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
              <WishlistButton productId={product._id} />
            </Box>
            
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'contain', p: 2 }}
            />
            
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2" noWrap>
                {product.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {product.description}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={product.rating} readOnly precision={0.5} size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.rating})
                </Typography>
              </Box>
              
              <Typography variant="h6" color="primary">
                {formatCurrency(product.price)}
              </Typography>
              
              {product.inStock ? (
                <Typography variant="body2" color="success.main">
                  In Stock
                </Typography>
              ) : (
                <Typography variant="body2" color="error">
                  Out of Stock
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;