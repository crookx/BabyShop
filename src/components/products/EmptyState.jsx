import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const EmptyState = ({ onClearFilters, filters = {} }) => {
  const getFilterMessage = () => {
    const activeFilters = [];
    if (filters?.category) activeFilters.push('category');
    if (filters?.ageGroup) activeFilters.push('age group');
    if (filters?.priceRange) activeFilters.push('price range');
    
    return activeFilters.length 
      ? `No products found matching your ${activeFilters.join(', ')} filters`
      : 'No products found';
  };

  return (
    <Box sx={{ 
      textAlign: 'center', 
      py: 6,
      backgroundColor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <SearchOffIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {getFilterMessage()}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Try adjusting your filters or start over
      </Typography>
      <Button 
        variant="contained" 
        onClick={onClearFilters}
        sx={{ mt: 2 }}
      >
        Clear All Filters
      </Button>
    </Box>
  );
};

export default EmptyState;