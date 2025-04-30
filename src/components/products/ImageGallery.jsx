import React, { useState, useCallback } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { ZoomIn, Close, ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleNext = useCallback(() => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <Box sx={{ position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '100%',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Box
            component="img"
            loading="lazy"
            src={images[selectedImage]}
            alt="Product view"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              cursor: 'zoom-in'
            }}
            onClick={() => setLightboxOpen(true)}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.1)',
              opacity: 0,
              transition: 'opacity 0.3s',
              '&:hover': {
                opacity: 1
              }
            }}
          >
            <IconButton
              onClick={() => setLightboxOpen(true)}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <ZoomIn />
            </IconButton>
          </Box>
        </Box>
      </motion.div>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 2,
          overflowX: 'auto',
          pb: 1
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
              component="img"
              loading="lazy"
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              sx={{
                width: 60,
                height: 60,
                objectFit: 'cover',
                borderRadius: 1,
                cursor: 'pointer',
                border: index === selectedImage ? '2px solid' : 'none',
                borderColor: 'primary.main'
              }}
            />
          </motion.div>
        ))}
      </Box>

      <Modal
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          width: '90vw', 
          height: '90vh',
          bgcolor: 'background.paper'
        }}>
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
          >
            <Close />
          </IconButton>

          <TransformWrapper>
            <TransformComponent>
              <img
                src={images[selectedImage]}
                alt="Product full view"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </TransformComponent>
          </TransformWrapper>

          <IconButton
            onClick={handlePrev}
            sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default React.memo(ImageGallery);