import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Gift, Share, Edit } from '@mui/icons-material';
import styled from '@emotion/styled';

const RegistryCard = styled(Paper)`
  padding: 24px;
  border-radius: 20px;
  background: white;
  height: 100%;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const GiftRegistry = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h3" gutterBottom align="center">
          Create Your Baby Registry
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Share your wishlist with family and friends
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <RegistryCard>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Gift sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" gutterBottom>
                Create Registry
              </Typography>
              <Typography color="text.secondary" paragraph>
                Start your registry and add items you love
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ borderRadius: '50px' }}
              >
                Get Started
              </Button>
            </RegistryCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <RegistryCard>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Share sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" gutterBottom>
                Share Registry
              </Typography>
              <Typography color="text.secondary" paragraph>
                Share your registry with loved ones
              </Typography>
              <Button 
                variant="outlined" 
                fullWidth
                sx={{ borderRadius: '50px' }}
              >
                Share Now
              </Button>
            </RegistryCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <RegistryCard>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Edit sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" gutterBottom>
                Manage Registry
              </Typography>
              <Typography color="text.secondary" paragraph>
                Update and track your registry items
              </Typography>
              <Button 
                variant="outlined" 
                fullWidth
                sx={{ borderRadius: '50px' }}
              >
                Manage Items
              </Button>
            </RegistryCard>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default GiftRegistry;