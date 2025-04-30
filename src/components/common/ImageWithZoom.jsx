import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ImageWithZoom = ({ src, alt, aspectRatio = '1/1' }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        onClick={() => setOpen(true)}
        sx={{
          width: '100%',
          aspectRatio,
          objectFit: 'cover',
          cursor: 'zoom-in',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <Box sx={{ 
              position: 'relative',
              width: '90vw',
              height: '90vh',
              bgcolor: 'background.paper'
            }}>
              <TransformComponent>
                <img
                  src={src}
                  alt={alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </TransformComponent>
            </Box>
          )}
        </TransformWrapper>
      </Modal>
    </>
  );
};

export default React.memo(ImageWithZoom);