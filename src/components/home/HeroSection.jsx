import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled(Box)`
  min-height: 90vh;
  background: linear-gradient(135deg, #FFF5F7 0%, #FFE5ED 100%);
  padding: 120px 0 60px;
  position: relative;
  overflow: hidden;
`;

const FloatingImage = styled(motion.img)`
  position: absolute;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroContainer>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2
                }}
              >
                Welcome to Qaran Qaran Baby Shop
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Discover our curated collection of premium baby products
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate('/products')}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  Shop Now
                </Button>
              </motion.div>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ position: 'relative', height: '500px' }}>
            <FloatingImage
              src="/images/hero/baby-1.jpg"
              alt="Baby Products"
              style={{ width: '60%', top: '10%', right: '5%' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <FloatingImage
              src="/images/hero/baby-2.jpg"
              alt="Baby Clothes"
              style={{ width: '40%', bottom: '15%', left: '10%' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(255, 107, 156, 0.1)',
                top: '20%',
                left: '20%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;