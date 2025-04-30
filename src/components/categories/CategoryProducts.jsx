import React from 'react';
import { Grid, Box, Typography, Pagination, Chip, Stack } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters, fetchProducts } from '../../store/slices/productSlice';
import ProductCard from '../products/ProductCard';
import ProductSkeleton from '../products/ProductSkeleton';
import EmptyState from '../common/EmptyState';

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, selectedCategory, filters, totalPages } = useSelector(state => state.products);

  const getActiveFilters = () => {
    const active = [];
    if (filters.ageGroup && filters.ageGroup !== 'all') {
      active.push({ key: 'ageGroup', label: `Age: ${filters.ageGroup}` });
    }
    if (filters.price[0] > 0 || filters.price[1] < 1000) {
      active.push({ key: 'price', label: `Price: $${filters.price[0]} - $${filters.price[1]}` });
    }
    if (filters.sort && filters.sort !== 'newest') {
      const sortLabels = {
        'price_asc': 'Price: Low to High',
        'price_desc': 'Price: High to Low',
        'name_asc': 'Name: A to Z'
      };
      active.push({ key: 'sort', label: `Sort: ${sortLabels[filters.sort]}` });
    }
    return active;
  };

  const handleRemoveFilter = (filterKey) => {
    const defaultValues = {
      ageGroup: 'all',
      price: [0, 1000],
      sort: 'newest'
    };
    dispatch(updateFilters({ [filterKey]: defaultValues[filterKey] }));
    dispatch(fetchProducts({
      category: selectedCategory?.slug,
      filters: { ...filters, [filterKey]: defaultValues[filterKey] }
    }));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(updateFilters({ page: newPage }));
    dispatch(fetchProducts({
      category: selectedCategory?.slug,
      filters: { ...filters, page: newPage }
    }));
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
            <ProductSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  const activeFilters = getActiveFilters();

  return (
    <Box>
      {activeFilters.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>Active Filters:</Typography>
          {activeFilters.map((filter) => (
            <Chip
              key={filter.key}
              label={filter.label}
              onDelete={() => handleRemoveFilter(filter.key)}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      )}

      {!products?.length ? (
        <EmptyState
          icon={<ShoppingBag sx={{ fontSize: 64 }} />}
          title="No Products Found"
          description={`No products found${selectedCategory ? ` in ${selectedCategory.name}` : ''} with the selected filters.`}
        />
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination 
                count={totalPages}
                page={filters.page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CategoryProducts;