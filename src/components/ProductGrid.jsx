import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
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
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <Card 
            component={Link}
            to={`/product/${product._id}`}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              textDecoration: 'none',
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
              <Typography gutterBottom variant="h6" component="h2" noWrap color="text.primary">
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

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="primary">
                  ${product.price.toFixed(2)}
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;