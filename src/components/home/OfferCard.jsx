import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OfferCard = ({ offer }) => {
  const navigate = useNavigate();
  console.log('Rendering offer:', offer);

  if (!offer) return null;

  const handleClick = () => {
    if (offer.productId) {
      navigate(`/product/${offer.productId}`);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={offer.image}
        alt={offer.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {offer.name}
        </Typography>
        {offer.productName && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {offer.productName}
          </Typography>
        )}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            {offer.price > 0 && (
              <>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${offer.price.toFixed(2)}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${offer.discountedPrice.toFixed(2)}
                </Typography>
              </>
            )}
          </Box>
          <Typography 
            variant="body2" 
            color="error.main"
            sx={{ 
              bgcolor: 'error.light',
              color: 'error.main',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold'
            }}
          >
            {offer.discount}% OFF
          </Typography>
        </Box>
        {offer.timeLeft && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Time left: {offer.timeLeft}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default OfferCard;