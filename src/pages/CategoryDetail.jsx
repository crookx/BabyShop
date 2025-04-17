import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, CircularProgress } from '@mui/material';
import { fetchCategoryDetails, fetchCategoryProducts, selectCategoryDetails } from '../store/slices/categorySlice';
import CategoryLanding from '../components/categories/CategoryLanding';
import CategoryProducts from '../components/categories/CategoryProducts';
import EmptyState from '../components/common/EmptyState';
import { ShoppingBag } from '@mui/icons-material';

const CategoryDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  
  // Add state tracking
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const categoryState = useSelector(selectCategoryDetails);
  const { currentCategory, loading, error } = categoryState;

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const result = await dispatch(fetchCategoryDetails(slug)).unwrap();
        if (result?._id) {
          await dispatch(fetchCategoryProducts(result._id)).unwrap();
        }
      } catch (error) {
        console.error('Failed to load category:', error);
      } finally {
        setIsInitialLoad(false);
      }
    };
    loadCategory();
  }, [dispatch, slug]);

  // Show loading only on initial load
  if (isInitialLoad || loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<ShoppingBag sx={{ fontSize: 64 }} />}
        title="Error Loading Category"
        description={error}
      />
    );
  }

  if (!currentCategory) {
    return (
      <EmptyState
        icon={<ShoppingBag sx={{ fontSize: 64 }} />}
        title="Loading Category..."
        description="Please wait while we fetch the category details."
      />
    );
  }

  return (
    <Box>
      <CategoryLanding />
      <Container maxWidth="xl">
        <CategoryProducts />
      </Container>
    </Box>
  );
};

export default React.memo(CategoryDetail);