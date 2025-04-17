import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import api from '../../utils/axios';

const RelatedProducts = ({ category, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products', {
          params: {
            category: category?._id,
            exclude: currentProductId,
            limit: 4
          }
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category?._id) {
      fetchRelatedProducts();
    }
  }, [category, currentProductId]);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton width="60%" sx={{ mt: 1 }} />
            <Skeleton width="40%" sx={{ mt: 1 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={3} key={product._id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default RelatedProducts;