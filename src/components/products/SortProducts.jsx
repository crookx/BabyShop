import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const SortProducts = ({ sortBy, onSortChange, disabled }) => {
  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        disabled={disabled}
        label="Sort By"
      >
        <MenuItem value="newest">Newest First</MenuItem>
        <MenuItem value="price_asc">Price: Low to High</MenuItem>
        <MenuItem value="price_desc">Price: High to Low</MenuItem>
        <MenuItem value="name_asc">Name: A-Z</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortProducts;