import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
import { fetchCategoryDetails, fetchCategoryProducts } from '../../store/slices/categorySlice';
import ProductCard from '../products/ProductCard';
import EmptyState from '../common/EmptyState';
import { ShoppingBag } from '@mui/icons-material';

const CategoryDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  
  // Fixed selector to properly access state
  const { currentCategory, products, loading, error } = useSelector((state) => ({
    currentCategory: state.categories?.currentCategory || null,
    products: state.categories?.products || [],
    loading: state.categories?.loading || false,
    error: state.categories?.error || null
  }));

  useEffect(() => {
    const loadCategory = async () => {
      try {
        console.log('Fetching category:', slug);
        const result = await dispatch(fetchCategoryDetails(slug)).unwrap();
        console.log('Category data:', result);
        if (result?._id) {
          console.log('Fetching products for category:', result._id);
          dispatch(fetchCategoryProducts(result._id));
        }
      } catch (error) {
        console.error('Failed to load category:', error);
      }
    };
    loadCategory();
  }, [dispatch, slug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentCategory) {
    return (
      <EmptyState
        icon={<ShoppingBag sx={{ fontSize: 64 }} />}
        title="Category Not Found"
        description="This category doesn't exist or has been removed."
      />
    );
  }

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentCategory.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 300,
          display: 'flex',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h2" component="h1" color="white" gutterBottom>
            {currentCategory.name}
          </Typography>
          <Typography variant="h5" color="white">
            {currentCategory.description}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {products.length > 0 ? (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState
            icon={<ShoppingBag sx={{ fontSize: 64 }} />}
            title="No Products Found"
            description="There are no products in this category yet."
          />
        )}
      </Container>
    </Box>
  );
};

export default CategoryDetail;