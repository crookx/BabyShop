import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { orderService } from '../services/orderService';
import { format } from 'date-fns';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getUserOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      payment_failed: 'error'
    };
    return statusColors[status] || 'default';
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography>No orders found</Typography>
        </Paper>
      ) : (
        orders.map((order) => (
          <Accordion key={order._id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order #{order._id.slice(-6)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography>
                    {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography>${order.total.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Items
                </Typography>
                {order.items.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                      <Typography>
                        {item.name} x {item.quantity}
                      </Typography>
                    </Box>
                    <Typography>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {order.trackingNumber && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tracking Number: {order.trackingNumber}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Shipping Address
                </Typography>
                <Typography>
                  {order.user.firstName} {order.user.lastName}
                </Typography>
                <Typography>{order.user.address}</Typography>
                <Typography>
                  {order.user.city}, {order.user.state} {order.user.zipCode}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;