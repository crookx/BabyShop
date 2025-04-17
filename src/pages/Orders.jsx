import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch'; // Updated import path
import OrderTracking from '../components/orders/OrderTracking';

const Orders = () => {
  const navigate = useNavigate();
  const { data: orders, loading, error } = useFetch('/api/orders');

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {orders?.map((order) => (
        <Box key={order._id} sx={{ mb: 4 }}>
          <OrderTracking order={order} />
          <Paper sx={{ p: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            style={{ width: 50, height: 50, objectFit: 'cover' }}
                          />
                          {item.product.name}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h6">
                Total: ${order.total.toFixed(2)}
              </Typography>
              <Button 
                variant="outlined"
                onClick={() => navigate(`/order/${order._id}`)}
              >
                View Details
              </Button>
            </Box>
          </Paper>
        </Box>
      ))}
    </Container>
  );
};

export default Orders;