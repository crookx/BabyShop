import React from 'react';
import { Box, Slider, Typography, TextField } from '@mui/material';

const PriceRangeSlider = ({ value, onChange, min = 0, max = 1000, disabled }) => {
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleInputChange = (index) => (event) => {
    const newValue = [...value];
    newValue[index] = Number(event.target.value);
    if (!isNaN(newValue[index])) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', px: 2 }}>
      <Typography gutterBottom>Price Range</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          size="small"
          value={value[0]}
          onChange={handleInputChange(0)}
          disabled={disabled}
          label="Min"
          type="number"
          InputProps={{ inputProps: { min, max: value[1] } }}
        />
        <TextField
          size="small"
          value={value[1]}
          onChange={handleInputChange(1)}
          disabled={disabled}
          label="Max"
          type="number"
          InputProps={{ inputProps: { min: value[0], max } }}
        />
      </Box>
      <Slider
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        disabled={disabled}
        sx={{ mt: 1 }}
      />
    </Box>
  );
};

export default PriceRangeSlider;