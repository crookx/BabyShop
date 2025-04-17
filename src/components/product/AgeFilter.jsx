import React from 'react';
import { Box, Slider, Typography, Chip } from '@mui/material';

const AgeFilter = ({ onChange }) => {
  const ageRanges = [
    { value: 0, label: 'Newborn' },
    { value: 3, label: '3m' },
    { value: 6, label: '6m' },
    { value: 12, label: '12m' },
    { value: 24, label: '24m' }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>Age Range</Typography>
      <Slider
        marks={ageRanges}
        min={0}
        max={24}
        step={3}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}m`}
        onChange={(_, value) => onChange(value)}
      />
      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {ageRanges.map((range) => (
          <Chip
            key={range.value}
            label={range.label}
            onClick={() => onChange([range.value])}
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};

export default AgeFilter;