import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const steps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];

const OrderTracking = ({ order }) => {
  const getStepNumber = (status) => {
    return steps.indexOf(status);
  };

  return (
    <Paper 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ p: 3, mb: 3 }}
    >
      <Typography variant="h6" gutterBottom>
        Order #{order.orderNumber}
      </Typography>
      
      <Stepper activeStep={getStepNumber(order.status)} sx={{ my: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 3 }}>
        <Typography color="text.secondary">
          Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default OrderTracking;