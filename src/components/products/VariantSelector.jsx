import React, { useState, useEffect } from 'react';
import { Box, FormControl, Select, MenuItem, InputLabel, Typography, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const ColorSwatch = styled(Box)(({ theme, color, selected }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: color,
  border: `2px solid ${selected ? theme.palette.primary.main : 'transparent'}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  }
}));

const SizeButton = styled(Box)(({ theme, selected, disabled }) => ({
  padding: '8px 16px',
  border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: selected ? theme.palette.primary.light : 'transparent',
  color: disabled ? theme.palette.text.disabled : selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  opacity: disabled ? 0.5 : 1,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: disabled ? 'transparent' : selected ? theme.palette.primary.light : theme.palette.action.hover,
  }
}));

const VariantSelector = ({ 
  variants, 
  onVariantSelect, 
  initialColor = '', 
  initialSize = '',
  loading = false
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [availableSizes, setAvailableSizes] = useState([]);

  const colors = [...new Set(variants.map(v => v.attributes.color))];
  const sizes = [...new Set(variants.map(v => v.attributes.size))];

  useEffect(() => {
    if (selectedColor) {
      const sizesForColor = variants
        .filter(v => v.attributes.color === selectedColor && v.stock > 0)
        .map(v => v.attributes.size);
      setAvailableSizes(sizesForColor);
    }
  }, [selectedColor, variants]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize('');
    onVariantSelect(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const variant = variants.find(v => 
      v.attributes.color === selectedColor && 
      v.attributes.size === size
    );
    onVariantSelect(variant);
  };

  const isSizeAvailable = (size) => {
    return variants.some(v => 
      v.attributes.color === selectedColor && 
      v.attributes.size === size && 
      v.stock > 0
    );
  };

  if (loading) {
    return <CircularProgress size={24} />;
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>Color</Typography>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {colors.map(color => (
          <Grid item key={color}>
            <ColorSwatch
              color={color.toLowerCase()}
              selected={color === selectedColor}
              onClick={() => handleColorSelect(color)}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle2" gutterBottom>Size</Typography>
      <Grid container spacing={1}>
        {sizes.map(size => (
          <Grid item key={size}>
            <SizeButton
              selected={size === selectedSize}
              disabled={!isSizeAvailable(size)}
              onClick={() => isSizeAvailable(size) && handleSizeSelect(size)}
            >
              {size}
            </SizeButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(VariantSelector);