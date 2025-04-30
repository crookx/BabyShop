import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Slider, 
  FormControl, 
  Select, 
  MenuItem, 
  Chip,
  Stack,
  Button,
  Divider,
  IconButton,
  Collapse,
  Rating
} from '@mui/material';
import { 
  FilterList, 
  Clear, 
  ExpandMore, 
  ExpandLess 
} from '@mui/icons-material';
import { updateFilters, fetchProducts } from '../../store/slices/productSlice';
import { motion, AnimatePresence } from 'framer-motion';

const ProductFilters = ({ selectedCategory, currentFilters, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    ageGroup: true,
    rating: true,
    sort: true
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...currentFilters, [key]: value };
    dispatch(updateFilters(newFilters));

    const params = new URLSearchParams(window.location.search);
    if (key === 'price') {
      params.set('priceRange', `${value[0]}-${value[1]}`);
    } else {
      params.set(key, value);
    }
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    dispatch(fetchProducts({
      category: selectedCategory,
      filters: newFilters
    }));

    navigate({ search: params.toString() });
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      price: [0, 1000],
      ageGroup: 'all',
      rating: 0,
      sort: 'newest'
    };
    dispatch(updateFilters(defaultFilters));
    navigate({ search: selectedCategory ? `category=${selectedCategory}` : '' });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const activeFiltersCount = Object.keys(currentFilters).filter(key => {
    if (key === 'price') {
      return currentFilters.price[0] > 0 || currentFilters.price[1] < 1000;
    }
    return currentFilters[key] !== 'all' && currentFilters[key] !== 'newest';
  }).length;

  return (
    <Box 
      sx={{ 
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          <Typography variant="h6">Filters</Typography>
          {activeFiltersCount > 0 && (
            <Chip 
              label={activeFiltersCount}
              size="small"
              color="primary"
            />
          )}
        </Box>
        <Button
          startIcon={<Clear />}
          onClick={clearAllFilters}
          disabled={activeFiltersCount === 0}
          size="small"
        >
          Clear All
        </Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Price Range Filter */}
      <Box sx={{ mb: 3 }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          onClick={() => toggleSection('price')}
          sx={{ cursor: 'pointer', mb: 1 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">Price Range</Typography>
          <IconButton size="small">
            {expandedSections.price ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Stack>
        <Collapse in={expandedSections.price}>
          <Slider
            value={currentFilters.price}
            onChange={(_, value) => handleFilterChange('price', value)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={10}
            sx={{ mt: 2 }}
          />
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography variant="body2" color="text.secondary">
              ${currentFilters.price[0]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${currentFilters.price[1]}
            </Typography>
          </Stack>
        </Collapse>
      </Box>

      {/* Age Group Filter */}
      <Box sx={{ mb: 3 }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          onClick={() => toggleSection('ageGroup')}
          sx={{ cursor: 'pointer', mb: 1 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">Age Group</Typography>
          <IconButton size="small">
            {expandedSections.ageGroup ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Stack>
        <Collapse in={expandedSections.ageGroup}>
          <FormControl fullWidth size="small">
            <Select
              value={currentFilters.ageGroup}
              onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
              sx={{ mt: 1 }}
            >
              <MenuItem value="all">All Ages</MenuItem>
              <MenuItem value="0-3">0-3 months</MenuItem>
              <MenuItem value="3-6">3-6 months</MenuItem>
              <MenuItem value="6-12">6-12 months</MenuItem>
              <MenuItem value="12-24">12-24 months</MenuItem>
              <MenuItem value="24+">24+ months</MenuItem>
            </Select>
          </FormControl>
        </Collapse>
      </Box>

      {/* Rating Filter */}
      <Box sx={{ mb: 3 }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          onClick={() => toggleSection('rating')}
          sx={{ cursor: 'pointer', mb: 1 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">Rating</Typography>
          <IconButton size="small">
            {expandedSections.rating ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Stack>
        <Collapse in={expandedSections.rating}>
          <Stack spacing={1} mt={1}>
            {[4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={currentFilters.rating === rating ? "contained" : "outlined"}
                size="small"
                onClick={() => handleFilterChange('rating', rating)}
                startIcon={<Rating value={rating} readOnly size="small" />}
                sx={{ justifyContent: 'flex-start' }}
              >
                & Up
              </Button>
            ))}
          </Stack>
        </Collapse>
      </Box>

      {/* Sort Filter */}
      <Box sx={{ mb: 3 }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          onClick={() => toggleSection('sort')}
          sx={{ cursor: 'pointer', mb: 1 }}
        >
          <Typography variant="subtitle1" fontWeight="medium">Sort By</Typography>
          <IconButton size="small">
            {expandedSections.sort ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Stack>
        <Collapse in={expandedSections.sort}>
          <FormControl fullWidth size="small">
            <Select
              value={currentFilters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              sx={{ mt: 1 }}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
              <MenuItem value="name_asc">Name: A to Z</MenuItem>
              <MenuItem value="rating_desc">Highest Rated</MenuItem>
            </Select>
          </FormControl>
        </Collapse>
      </Box>

      {onClose && (
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );
};

export default ProductFilters;