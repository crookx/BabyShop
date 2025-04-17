import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCategoryDetails } from '../../store/slices/categorySlice';
import ProductCard from '../products/ProductCard';
import EmptyState from '../common/EmptyState';
import { ShoppingBag } from '@mui/icons-material';

const CategoryProducts = () => {
  const { products } = useSelector(selectCategoryDetails);

  if (!products?.length) {
    return (
      <EmptyState
        icon={<ShoppingBag sx={{ fontSize: 64 }} />}
        title="No Products Found"
        description="There are no products in this category yet."
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(CategoryProducts);