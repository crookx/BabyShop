import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  Grid,
  Chip,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { LocalShipping, Done, Schedule } from '@mui/icons-material';

const OrderTracking = () => {
  const steps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  const currentStep = 2; // This would come from your order status

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Track Your Order
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Stepper activeStep={currentStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Order #123456
              </Typography>
              <Typography color="textSecondary">
                Estimated Delivery: March 15, 2024
              </Typography>
              <Chip
                icon={<LocalShipping />}
                label="In Transit"
                color="primary"
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Updates
              </Typography>
              <Timeline>
                <TimelineItem
                  date="March 12, 2024 09:30 AM"
                  title="Package in transit"
                  description="Your package is on its way to the delivery address"
                  icon={<LocalShipping />}
                />
                <TimelineItem
                  date="March 11, 2024 02:15 PM"
                  title="Order processed"
                  description="Your order has been processed and packed"
                  icon={<Done />}
                />
                <TimelineItem
                  date="March 10, 2024 10:00 AM"
                  title="Order confirmed"
                  description="We've received your order"
                  icon={<Schedule />}
                />
              </Timeline>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

const Timeline = ({ children }) => (
  <Box sx={{ position: 'relative', pl: 3 }}>
    {children}
  </Box>
);

const TimelineItem = ({ date, title, description, icon }) => (
  <Box sx={{ mb: 3, position: 'relative' }}>
    <Box
      sx={{
        position: 'absolute',
        left: -41,
        bgcolor: 'primary.main',
        p: 1,
        borderRadius: '50%',
        color: 'white'
      }}
    >
      {icon}
    </Box>
    <Typography variant="subtitle2" color="textSecondary">
      {date}
    </Typography>
    <Typography variant="subtitle1" fontWeight="bold">
      {title}
    </Typography>
    <Typography color="textSecondary">
      {description}
    </Typography>
  </Box>
);

export default OrderTracking;