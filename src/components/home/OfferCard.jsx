import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';

const OfferCard = ({ offer }) => {
  const navigate = useNavigate();

  if (!offer) return null;

  const handleClick = () => {
    if (offer.productId) {
      navigate(`/product/${offer.productId}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card 
        onClick={handleClick}
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'error.main',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            zIndex: 1
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            {offer.discount}% OFF
          </Typography>
        </Box>
        
        <CardMedia
          component="img"
          height="200"
          image={offer.image}
          alt={offer.name}
          sx={{ objectFit: 'cover' }}
        />
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {offer.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {offer.productName}
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ textDecoration: 'line-through' }}
            >
              ${offer.price?.toFixed(2)}
            </Typography>
            <Typography variant="h6" color="error.main">
              ${offer.discountedPrice?.toFixed(2)}
            </Typography>
          </Box>

          {offer.timeLeft && (
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary'
            }}>
              <TimerIcon sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2">
                {offer.timeLeft} remaining
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OfferCard;