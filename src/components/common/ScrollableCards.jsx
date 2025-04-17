import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

const ScrollableCards = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    
    container.scrollTo({
      left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <IconButton
        onClick={() => scroll('left')}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'grey.100' }
        }}
      >
        <ArrowBack />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          gap: 2,
          py: 2,
          px: 6,
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {children}
      </Box>

      <IconButton
        onClick={() => scroll('right')}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'grey.100' }
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default ScrollableCards;