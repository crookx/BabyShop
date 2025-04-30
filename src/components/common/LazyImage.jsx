import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

const LazyImage = ({ src, alt, sx, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <Box
        component="img"
        src="/placeholder-image.jpg"
        alt="Placeholder"
        sx={{ ...sx, opacity: 0.5 }}
        {...props}
      />
    );
  }

  return loaded ? (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={sx}
      {...props}
    />
  ) : (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={sx}
    />
  );
};

export default React.memo(LazyImage);