import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';
import { orderService } from '../services/orderService';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderData = await orderService.getOrder(orderId);
      setOrder(orderData);
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Order Confirmed!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Order ID: {order._id}
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Stepper activeStep={0}>
            <Step>
              <StepLabel>Order Placed</StepLabel>
            </Step>
            <Step>
              <StepLabel>Processing</StepLabel>
            </Step>
            <Step>
              <StepLabel>Shipped</StepLabel>
            </Step>
            <Step>
              <StepLabel>Delivered</StepLabel>
            </Step>
          </Stepper>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          {order.items.map((item) => (
            <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>{item.name} x {item.quantity}</Typography>
              <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Box sx={{ borderTop: 1, pt: 2, mt: 2 }}>
            <Typography variant="h6">Total: ${order.total.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Details
          </Typography>
          <Typography>
            {order.user.firstName} {order.user.lastName}
          </Typography>
          <Typography>{order.user.address}</Typography>
          <Typography>
            {order.user.city}, {order.user.state} {order.user.zipCode}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;