import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { fetchCategoryDetails, selectCategoryDetails } from '../store/slices/categorySlice';
import CategoryLanding from '../components/categories/CategoryLanding';
import CategoryProducts from '../components/categories/CategoryProducts';

const CategoryDetail = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { loading } = useSelector(selectCategoryDetails);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCategoryDetails(slug));
    }
  }, [dispatch, slug, searchParams]);

  return (
    <Box>
      <CategoryLanding />
      <CategoryProducts />
    </Box>
  );
};

export default CategoryDetail;