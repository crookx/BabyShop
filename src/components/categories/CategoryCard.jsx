import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { setSelectedCategory, fetchProducts, resetFilters } from '../../store/slices/productSlice';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCategoryClick = async () => {
    // Reset filters first
    dispatch(resetFilters());
    
    // Set selected category
    dispatch(setSelectedCategory(category));
    
    // Default filters for category view
    const defaultFilters = {
      page: 1,
      limit: 12,
      sort: 'newest',
      price: [0, 1000],
      ageGroup: 'all'
    };

    // Fetch products with default filters
    await dispatch(fetchProducts({ 
      category: category.slug || category._id,
      filters: defaultFilters
    }));

    // Update URL with category and default filters
    const params = new URLSearchParams();
    params.set('category', category.slug || category._id);
    params.set('page', '1');
    params.set('sort', 'newest');
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <Card 
      onClick={handleCategoryClick}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[4]
        }
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={category.image || '/images/placeholder.jpg'}
        alt={category.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography 
          variant="h6" 
          component="div" 
          textAlign="center"
          noWrap
        >
          {category.name}
        </Typography>
        {category.description && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            textAlign="center"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {category.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;