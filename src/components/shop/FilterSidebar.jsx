import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Slider, Accordion, AccordionSummary,
  AccordionDetails, Button, FormControl, Select, MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { updateFilters, resetFilters, fetchProducts } from '../../store/slices/productSlice';

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCategory, filters } = useSelector(state => state.products);

  const defaultFilters = {
    price: [0, 1000],
    sort: 'newest',
    ageGroup: 'all',
    page: 1,
    limit: 12
  };

  const ageGroups = [
    { value: 'all', label: 'All Ages' },
    { value: '0-3 months', label: 'Newborn (0-3 months)' },
    { value: '3-6 months', label: 'Infant (3-6 months)' },
    { value: '6-12 months', label: 'Baby (6-12 months)' },
    { value: '12-24 months', label: 'Toddler (12-24 months)' },
    { value: '24+ months', label: '2+ Years' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' }
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlFilters = {};
    
    const price = params.get('priceRange');
    if (price) {
      const [min, max] = price.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        urlFilters.price = [min, max];
      }
    }
    
    const ageGroup = params.get('ageGroup');
    if (ageGroup) urlFilters.ageGroup = ageGroup;
    
    const sort = params.get('sort');
    if (sort) urlFilters.sort = sort;
    
    if (Object.keys(urlFilters).length > 0) {
      dispatch(updateFilters(urlFilters));
      applyFilters(urlFilters);
    }
  }, [location.search]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    dispatch(updateFilters({ [key]: value, page: 1 }));
    updateUrlParams(key, value);
    applyFilters(newFilters);
  };

  const updateUrlParams = (key, value) => {
    const params = new URLSearchParams(location.search);
    
    if (key === 'price') {
      params.set('priceRange', `${value[0]}-${value[1]}`);
    } else if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    if (selectedCategory?.slug) {
      params.set('category', selectedCategory.slug);
    }
    
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    const params = new URLSearchParams();
    if (selectedCategory?.slug) {
      params.set('category', selectedCategory.slug);
    }
    navigate({ search: params.toString() }, { replace: true });
    applyFilters(defaultFilters);
  };

  const applyFilters = (currentFilters) => {
    dispatch(fetchProducts({
      category: selectedCategory?.slug,
      filters: currentFilters
    }));
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <Button
          startIcon={<RestartAltIcon />}
          onClick={handleResetFilters}
          size="small"
        >
          Reset
        </Button>
      </Box>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sort By</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <Select
              value={filters.sort || 'newest'}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={filters.price}
            onChange={(e, value) => handleFilterChange('price', value)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">${filters.price[0]}</Typography>
            <Typography variant="body2">${filters.price[1]}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Age Group</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <Select
              value={filters.ageGroup || 'all'}
              onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
            >
              {ageGroups.map((age) => (
                <MenuItem key={age.value} value={age.value}>
                  {age.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterSidebar;