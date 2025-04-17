import React from 'react';
import { Box, Typography } from '@mui/material';
import OfferCard from './OfferCard';
import ScrollableCards from '../common/ScrollableCards';

const SpecialOffers = ({ offers }) => {
  if (!offers || !Array.isArray(offers) || offers.length === 0) {
    return null;
  }

  return (
    <Box sx={{ my: 4 }}>
      <ScrollableCards>
        {offers.map((offer) => (
          <Box 
            key={offer._id}
            sx={{ 
              minWidth: { xs: '280px', sm: '300px' },
              maxWidth: { xs: '280px', sm: '300px' }
            }}
          >
            <OfferCard offer={offer} />
          </Box>
        ))}
      </ScrollableCards>
    </Box>
  );
};

export default SpecialOffers;