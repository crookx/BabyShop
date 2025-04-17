import React from 'react';
import { Box, Typography, Slider, Checkbox, FormGroup, FormControlLabel, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { motion } from 'framer-motion';

const ProductFilters = ({ filters, onChange }) => {
  const handlePriceChange = (_, value) => {
    onChange({ ...filters, priceRange: value.join('-') });
  };

  const handleCategoryChange = (category) => {
    onChange({ ...filters, category });
  };

  const handleAgeGroupChange = (age) => {
    onChange({ ...filters, ageGroup: age });
  };

  const handleReset = () => {
    onChange({
      category: '',
      priceRange: '0-1000',
      ageGroup: ''
    });
  };

  const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);

  return (
    <Box component={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <Button
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
          size="small"
        >
          Reset
        </Button>
      </Box>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={[minPrice, maxPrice]}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography>${minPrice}</Typography>
            <Typography>${maxPrice}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {['Clothing', 'Toys', 'Feeding', 'Diapers', 'Bath & Skincare'].map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox 
                    checked={filters.category === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Age Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {['0-3 months', '3-6 months', '6-12 months', '1-2 years', '2-3 years'].map((age) => (
              <FormControlLabel
                key={age}
                control={
                  <Checkbox 
                    checked={filters.ageGroup === age}
                    onChange={() => handleAgeGroupChange(age)}
                  />
                }
                label={age}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductFilters;