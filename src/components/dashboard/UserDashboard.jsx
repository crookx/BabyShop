import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import {
  ShoppingBag,
  Favorite,
  Person,
  LocalShipping,
  Settings,
  Notifications
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import OrderHistory from './OrderHistory';
import WishlistItems from './WishlistItems';
import ProfileSettings from './ProfileSettings';
import OrderTracking from './OrderTracking';

const UserDashboard = () => {
  const [tab, setTab] = React.useState(0);

  const renderContent = () => {
    switch (tab) {
      case 0: return <OrderHistory />;
      case 1: return <WishlistItems />;
      case 2: return <OrderTracking />;
      case 3: return <ProfileSettings />;
      default: return null;
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Paper sx={{ p: 3 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                  src="/path-to-user-image.jpg"
                />
                <Typography variant="h6">John Doe</Typography>
                <Typography color="textSecondary">john@example.com</Typography>
              </Box>

              <List>
                <ListItem button selected={tab === 0} onClick={() => setTab(0)}>
                  <ListItemIcon><ShoppingBag /></ListItemIcon>
                  <ListItemText primary="Orders" />
                  <Badge badgeContent={4} color="primary" />
                </ListItem>
                <ListItem button selected={tab === 1} onClick={() => setTab(1)}>
                  <ListItemIcon><Favorite /></ListItemIcon>
                  <ListItemText primary="Wishlist" />
                </ListItem>
                <ListItem button selected={tab === 2} onClick={() => setTab(2)}>
                  <ListItemIcon><LocalShipping /></ListItemIcon>
                  <ListItemText primary="Track Orders" />
                </ListItem>
                <ListItem button selected={tab === 3} onClick={() => setTab(3)}>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={9}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Paper sx={{ p: 3 }}>
              {renderContent()}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;