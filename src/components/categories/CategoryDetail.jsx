import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryDetails, fetchCategoryProducts } from '../../store/slices/categorySlice';
import ProductCard from '../products/ProductCard';
import EmptyState from '../common/EmptyState';
import { ShoppingBag } from '@mui/icons-material';
import LoadingOverlay from '../common/LoadingOverlay';
import CategoryLanding from '../categories/CategoryLanding';
import FilterSidebar from '../filters/FilterSidebar';
import CategoryProducts from '../categories/CategoryProducts';

const CategoryDetail = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    price: [0, 1000],
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page')) || 1
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const dispatch = useDispatch();

  const { currentCategory, products, loading, error, categories } = useSelector((state) => ({
    currentCategory: state.categories?.currentCategory || null,
    products: state.categories?.products || [],
    loading: state.categories?.loading || false,
    error: state.categories?.error || null,
    categories: state.categories?.list || []
  }));

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setIsInitialLoad(true);
        const result = await dispatch(fetchCategoryDetails(slug)).unwrap();
        if (result?._id) {
          await dispatch(fetchCategoryProducts({ 
            categoryId: result._id,
            filters,
            page: filters.page
          })).unwrap();
        }
      } catch (error) {
        console.error('Failed to load category:', error);
      } finally {
        setIsInitialLoad(false);
      }
    };
    loadCategory();
  }, [dispatch, slug, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  if (isInitialLoad) {
    return <LoadingOverlay />;
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
      <CategoryLanding category={currentCategory} />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FilterSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange}
              categories={categories}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <CategoryProducts 
              products={products}
              loading={loading}
              error={error}
              page={filters.page}
              onPageChange={(newPage) => handleFilterChange({ page: newPage })}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryDetail;