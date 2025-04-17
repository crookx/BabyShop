import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';

const OrderDetails = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Order ID: {id}</Typography>
        {/* Add more order details here */}
      </Paper>
    </Container>
  );
};

export default OrderDetails;