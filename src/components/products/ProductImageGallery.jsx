import React, { useState } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const ProductImageGallery = ({ images = [], mainImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = mainImage ? [mainImage, ...images] : images;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!allImages.length) return null;

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box
        component="img"
        src={allImages[currentIndex]}
        alt="Product"
        sx={{
          width: '100%',
          height: 'auto',
          maxHeight: '500px',
          objectFit: 'contain',
          borderRadius: 1
        }}
      />
      
      {allImages.length > 1 && (
        <>
          <IconButton
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' }
            }}
            onClick={handlePrev}
          >
            <ArrowBack />
          </IconButton>
          
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' }
            }}
            onClick={handleNext}
          >
            <ArrowForward />
          </IconButton>
          
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              p: 1
            }}
          >
            {allImages.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: index === currentIndex ? 'primary.main' : 'grey.300',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ProductImageGallery;