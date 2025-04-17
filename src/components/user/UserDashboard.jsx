import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ShoppingBag,
  LocationOn,
  Settings,
  Favorite
} from '@mui/icons-material';

const UserDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <List>
            <ListItem button>
              <ListItemIcon><ShoppingBag /></ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            {/* More menu items */}
          </List>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={9}>
        <Paper sx={{ p: 3 }}>
          {/* Dashboard Content */}
        </Paper>
      </Grid>
    </Grid>
  );
};