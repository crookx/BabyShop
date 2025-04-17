import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchProductReviews } from '../store/slices/productSlice';

export const useProductDetails = (productId) => {
  const dispatch = useDispatch();
  const { 
    selectedProduct,
    productReviews,
    productLoading,
    reviewsLoading,
    error 
  } = useSelector(state => state.products);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
      dispatch(fetchProductReviews(productId));
    }
  }, [productId, dispatch]);

  return {
    product: selectedProduct,
    reviews: productReviews,
    isLoading: productLoading || reviewsLoading,
    error
  };
};