import React from 'react';
import { Box, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const CategoryFilters = ({ filters, onFilterChange }) => {
  const ageGroups = ['0-3 months', '3-6 months', '6-12 months', '12-24 months', '2+ years'];
  const types = ['All Products', 'Essential', 'Accessories', 'Care'];

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Age Group</InputLabel>
        <Select
          value={filters.ageGroup}
          label="Age Group"
          onChange={(e) => onFilterChange('ageGroup', e.target.value)}
        >
          <MenuItem value="">All Ages</MenuItem>
          {ageGroups.map((age) => (
            <MenuItem key={age} value={age}>{age}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          value={filters.type}
          label="Type"
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          <MenuItem value="">All Types</MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategoryFilters;