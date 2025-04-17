import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { LocalShipping, Security, Support, Payment } from '@mui/icons-material';
import styled from '@emotion/styled';

const FeatureCard = styled(motion.div)`
  padding: 30px;
  text-align: center;
  border-radius: 20px;
  background: white;
  box-shadow: 0 8px 30px rgba(0,0,0,0.05);
`;

const IconWrapper = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.palette.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
`;

const FeaturesShowcase = () => {
  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Free Shipping',
      description: 'Free shipping on orders above $50'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Shopping',
      description: '100% secure payment'
    },
    {
      icon: <Support sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: '24/7 Support',
      description: 'Dedicated support team'
    },
    {
      icon: <Payment sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#FFF5F7' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureCard whileHover={{ y: -10 }}>
                  <IconWrapper>
                    {feature.icon}
                  </IconWrapper>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesShowcase;