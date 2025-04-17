import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Grid, Typography, Box, Button, 
  Tabs, Tab, CircularProgress, Breadcrumbs, Link 
} from '@mui/material';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist } from '../../store/slices/wishlistSlice';
import Reviews from './Reviews';
import RelatedProducts from './RelatedProducts';
import ImageGallery from './ImageGallery';

const ProductDetails = () => {
  const { productId } = useParams();
  const { product, reviews, isLoading, error } = useProductDetails(productId);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box p={4}>
        <Typography color="error">
          {error || 'Product not found'}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" color="inherit">Home</Link>
        <Link href="/shop" color="inherit">Shop</Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ImageGallery images={product.images || []} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          {product.inStock ? (
            <Typography color="success.main" gutterBottom>
              In Stock
            </Typography>
          ) : (
            <Typography color="error" gutterBottom>
              Out of Stock
            </Typography>
          )}

          <Box sx={{ mt: 3, mb: 4 }}>
            <Button 
              variant="contained" 
              onClick={() => dispatch(addToCart(product))}
              disabled={!product.inStock}
              sx={{ mr: 2 }}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outlined"
              onClick={() => dispatch(addToWishlist(product))}
            >
              Add to Wishlist
            </Button>
          </Box>

          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="subtitle1">Age Group: {product.ageGroup}</Typography>
                {product.colors && (
                  <Typography variant="subtitle1">
                    Colors: {product.colors.join(', ')}
                  </Typography>
                )}
                {product.sizes && (
                  <Typography variant="subtitle1">
                    Sizes: {product.sizes.join(', ')}
                  </Typography>
                )}
              </Box>
            )}
            {activeTab === 1 && <Reviews reviews={reviews} productId={productId} />}
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Related Products</Typography>
        <RelatedProducts 
          category={product.category} 
          currentProductId={productId} 
        />
      </Box>
    </Container>
  );
};

export default ProductDetails;