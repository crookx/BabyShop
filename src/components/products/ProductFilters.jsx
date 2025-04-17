import React from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const ProductFilters = ({ categories, priceRange, onFilterChange }) => {
  return (
    <Box sx={{ width: 280, p: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categories.map(category => (
            <FormControlLabel
              key={category._id}
              control={<Checkbox />}
              label={category.name}
              onChange={(e) => onFilterChange('category', category._id, e.target.checked)}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => onFilterChange('price', newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};