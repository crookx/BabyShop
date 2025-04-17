import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Grid, Typography, Box, Button, 
  Breadcrumbs, Link, CircularProgress, Tabs, Tab 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageGallery from '../components/products/ImageGallery';
import ProductReviews from '../components/products/ProductReviews';
import RelatedProducts from '../components/products/RelatedProducts';
import ProductSpecifications from '../components/products/ProductSpecifications';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulate API call
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" color="inherit">Home</Link>
        <Link href="/shop" color="inherit">Shop</Link>
        <Typography color="text.primary">{product?.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ImageGallery images={product?.images || []} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product?.price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product?.description}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                startIcon={<FavoriteBorderIcon />}
                onClick={() => dispatch(addToWishlist(product))}
              >
                Add to Wishlist
              </Button>
            </Box>
          </Box>

          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && <ProductSpecifications product={product} />}
            {activeTab === 1 && <ProductReviews productId={productId} />}
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Related Products</Typography>
        <RelatedProducts category={product?.category} currentProductId={productId} />
      </Box>
    </Container>
  );
};

export default ProductDetails;