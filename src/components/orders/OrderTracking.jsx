import React from 'react';
import { Box, Typography, Container, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const TrackingCard = styled(Paper)`
  padding: 32px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
`;

const OrderTracking = ({ order }) => {
  const steps = ['Ordered', 'Processing', 'Shipped', 'Delivered'];
  const currentStep = steps.indexOf(order.status);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TrackingCard>
          <Typography variant="h4" gutterBottom>
            Order #{order.id}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography color="text.secondary">
              Expected Delivery: {order.expectedDelivery}
            </Typography>
            <Typography color="primary" fontWeight="bold">
              {order.status}
            </Typography>
          </Box>

          <Box sx={{ width: '100%', mb: 2 }}>
            <Stepper activeStep={currentStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Details
            </Typography>
            <Typography color="text.secondary">
              {order.shippingAddress}
            </Typography>
          </Box>
        </TrackingCard>
      </motion.div>
    </Container>
  );
};

export default OrderTracking;