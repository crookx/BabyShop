import React, { useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Paper 
        elevation={2}
        sx={{ 
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          aspectRatio: '1',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <IconButton
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
              }}
              onClick={handlePrev}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
              }}
              onClick={handleNext}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Paper>

      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        mt: 2, 
        overflowX: 'auto',
        pb: 1
      }}>
        {images.map((image, index) => (
          <Paper
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              width: 80,
              height: 80,
              cursor: 'pointer',
              border: index === currentIndex ? 2 : 0,
              borderColor: 'primary.main',
              overflow: 'hidden',
            }}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ImageGallery;