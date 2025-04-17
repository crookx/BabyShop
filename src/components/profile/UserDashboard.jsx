import React from 'react';
import { Box, Container, Grid, Paper, Typography, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Person, ShoppingBag, Favorite, Settings } from '@mui/icons-material';
import styled from '@emotion/styled';

const DashboardCard = styled(Paper)`
  padding: 24px;
  border-radius: 20px;
  height: 100%;
  background: white;
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatsCard = styled(motion(Paper))`
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(45deg, #FF6B9C 30%, #FF8E53 90%);
  color: white;
`;

const UserDashboard = ({ user }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <DashboardCard>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  {user.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
              </Box>
            </DashboardCard>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StatsCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShoppingBag sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4">
                      {user.totalOrders}
                    </Typography>
                    <Typography>Total Orders</Typography>
                  </Box>
                </Box>
              </StatsCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <StatsCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Favorite sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4">
                      {user.wishlistItems}
                    </Typography>
                    <Typography>Wishlist Items</Typography>
                  </Box>
                </Box>
              </StatsCard>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            {/* Add recent orders list component here */}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboard;