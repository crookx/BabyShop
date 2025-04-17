import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Paper
} from '@mui/material';
import { AGE_GROUPS, CATEGORIES } from '../../constants/filters';
import PriceRangeSlider from './PriceRangeSlider';

const ProductFilter = ({ filters, setFilters, disabled, productCount }) => {
  const handleCategoryChange = (event) => {
    setFilters({
      ...filters,
      category: event.target.value
    });
  };

  const handleAgeGroupChange = (event) => {
    setFilters({
      ...filters,
      ageGroup: event.target.value
    });
  };

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category || ''}
            onChange={handleCategoryChange}
            disabled={disabled}
            label="Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            {CATEGORIES.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Age Group</InputLabel>
          <Select
            value={filters.ageGroup || ''}
            onChange={handleAgeGroupChange}
            disabled={disabled}
            label="Age Group"
          >
            <MenuItem value="">All Ages</MenuItem>
            {AGE_GROUPS.map((age) => (
              <MenuItem key={age.value} value={age.value}>
                {age.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography gutterBottom>Price Range</Typography>
          <PriceRangeSlider
            value={filters.priceRange || [0, 1000]}
            onChange={(newValue) => setFilters({ ...filters, priceRange: newValue })}
            disabled={disabled}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProductFilter;