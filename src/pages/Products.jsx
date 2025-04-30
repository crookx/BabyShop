import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Fab,
  Breadcrumbs,
  Link,
  Fade
} from '@mui/material';
import { FilterList, Close, Home } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ProductFilters from '../components/filters/ProductFilters';
import ProductCard from '../components/products/ProductCard';
import SearchBar from '../components/search/SearchBar';
import { fetchProducts, updateFilters } from '../store/slices/productSlice';
import { useFetchFeaturedProductsQuery } from '../store/apis/productApi';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, loading, error, filters, hasMore } = useSelector(state => state.products);
  const { data: featuredProducts, isLoading: featuredLoading } = useFetchFeaturedProductsQuery();
  const categorySlug = searchParams.get('category');
  const isFeaturedPage = searchParams.get('featured') === 'true';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const observer = useRef();
  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(updateFilters({ page: (filters.page || 1) + 1 }));
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const priceRange = searchParams.get('priceRange');
    const ageGroup = searchParams.get('ageGroup');
    const sort = searchParams.get('sort');

    const formattedAgeGroup = ageGroup ? `${ageGroup} months` : null;
    const sortConfig = sort ? {
      field: sort.split('_')[0],
      order: sort.split('_')[1]
    } : null;

    const newFilters = {
      ...(priceRange && { price: priceRange.split('-').map(Number) }),
      ...(formattedAgeGroup && { ageGroup: formattedAgeGroup }),
      ...(sortConfig && { sort: sortConfig }),
      page: 1,
      limit: 12
    };

    dispatch(updateFilters(newFilters));
    
    const apiFilters = {
      ...newFilters,
      ...(sortConfig && {
        sortField: sortConfig.field,
        sortOrder: sortConfig.order
      })
    };

    if (isFeaturedPage) {
      // Featured products are handled by useFetchFeaturedProductsQuery
    } else {
      dispatch(fetchProducts({
        category: categorySlug,
        filters: apiFilters
      }));
    }
  }, [dispatch, categorySlug, searchParams, isFeaturedPage]);

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  const FiltersComponent = (
    <ProductFilters
      selectedCategory={categorySlug}
      currentFilters={filters}
      onClose={isMobile ? toggleMobileFilters : undefined}
    />
  );

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          href="/"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="small" />
          Home
        </Link>
        <Typography color="text.primary">
          {categorySlug ? categorySlug.replace('-', ' ') : 'All Products'}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mb: { xs: 2, md: 4 } }}>
        <SearchBar />
      </Box>
      
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Desktop Filters */}
        {!isMobile && (
          <Grid item md={3}>
            <Fade in={true}>
              {FiltersComponent}
            </Fade>
          </Grid>
        )}

        {/* Mobile Filters Drawer */}
        <Drawer
          anchor="left"
          open={mobileFiltersOpen}
          onClose={toggleMobileFilters}
          sx={{
            display: { md: 'none' },
            '& .MuiDrawer-paper': {
              width: '85%',
              maxWidth: '300px',
              p: 2
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={toggleMobileFilters}>
              <Close />
            </IconButton>
          </Box>
          {FiltersComponent}
        </Drawer>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3 
          }}>
            <Typography variant="h5" component="h1">
              {isFeaturedPage
                ? 'Featured Products'
                : categorySlug 
                  ? `${categorySlug.replace('-', ' ')} (${products.length} items)`
                  : `All Products (${products.length} items)`}
            </Typography>
            {isMobile && (
              <IconButton 
                onClick={toggleMobileFilters}
                sx={{ ml: 1 }}
                aria-label="open filters"
              >
                <FilterList />
              </IconButton>
            )}
          </Box>

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert severity="error">{error}</Alert>
              </motion.div>
            ) : !Array.isArray(isFeaturedPage ? featuredProducts : products) || (isFeaturedPage ? featuredProducts : products).length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert 
                  severity="info"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200
                  }}
                >
                  <Typography variant="h6">
                    {categorySlug 
                      ? `No products found in "${categorySlug.replace('-', ' ')}"`
                      : 'No products available.'}
                  </Typography>
                </Alert>
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {isFeaturedPage ? (
                  featuredLoading ? (
                    <CircularProgress />
                  ) : (
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                      {featuredProducts?.map((product, index) => (
                        <Grid item xs={6} sm={6} md={4} lg={4} key={product._id}>
                          <ProductCard product={product} />
                        </Grid>
                      ))}
                    </Grid>
                  )
                ) : (
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    {products.map((product, index) => (
                      <Grid 
                        item 
                        xs={6} 
                        sm={6} 
                        md={4} 
                        lg={4} 
                        key={product._id}
                        ref={index === products.length - 1 ? lastProductElementRef : null}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      </Grid>
                    ))}
                    {loading && (
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" p={4}>
                          <CircularProgress />
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Grid>
      </Grid>

      {/* Mobile Filter FAB */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="filters"
          onClick={toggleMobileFilters}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: { md: 'none' }
          }}
        >
          <FilterList />
        </Fab>
      )}
    </Container>
  );
};

export default Products;