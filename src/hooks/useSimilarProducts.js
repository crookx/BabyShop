import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../store/slices/productSlice';

const useSimilarProducts = (product, limit = 4) => {
  const { data: similarProducts, isLoading, error } = useGetProductsQuery({
    category: product?.category?._id,
    filters: {
      excludeId: product?._id,
      limit,
      sort: 'rating'
    }
  }, {
    skip: !product?._id
  });

  return {
    products: similarProducts?.products || [],
    isLoading,
    error
  };
};

export default useSimilarProducts;