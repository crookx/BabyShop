import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { isValidObjectId } from 'mongoose';
import { 
  Container, 
  Alert, 
  Button, 
  Box, 
  CircularProgress,
  Breadcrumbs,
  Link,
  Typography 
} from '@mui/material';
import { Home, NavigateNext } from '@mui/icons-material';
import { fetchProductDetail, clearProduct } from '../store/slices/productDetailSlice';
import ProductDetails from '../components/products/ProductDetails';
import Reviews from '../components/reviews/Reviews';
import { useGetReviewsQuery } from '../store/apis/reviewApi';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.productDetail || {});
  const { data: reviews } = useGetReviewsQuery(id);

  useEffect(() => {
    if (!id || !isValidObjectId(id)) {
      navigate('/products');
      return;
    }

    dispatch(fetchProductDetail(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, navigate]);

  useEffect(() => {
    // Track page view
    if (product) {
      try {
        // Analytics tracking code here
        console.log('Product view:', product.name);
      } catch (error) {
        console.error('Analytics error:', error);
      }
    }
  }, [product]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert 
          severity="error"
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => dispatch(fetchProductDetail(id))}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">Product not found</Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Qaran Baby Shop`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "sku": product._id,
            "brand": {
              "@type": "Brand",
              "name": "Qaran Baby Shop"
            },
            "offers": {
              "@type": "Offer",
              "url": window.location.href,
              "priceCurrency": "USD",
              "price": product.price,
              "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }
          })}
        </script>
      </Helmet>

      <Container sx={{ py: 4 }}>
        <Breadcrumbs 
          separator={<NavigateNext fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link 
            color="inherit" 
            href="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link color="inherit" href="/products">
            Products
          </Link>
          {product.category && (
            <Link 
              color="inherit" 
              href={`/products?category=${product.category.slug}`}
            >
              {product.category.name}
            </Link>
          )}
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <ProductDetails productData={product} />
        
        <Box sx={{ mt: 6 }}>
          <Reviews productId={id} reviews={reviews} />
        </Box>
      </Container>
    </>
  );
};

export default ProductDetail;