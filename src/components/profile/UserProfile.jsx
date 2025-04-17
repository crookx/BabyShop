import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.addresses?.[0]?.street || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                src={user?.avatar}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6">{`${user?.firstName} ${user?.lastName}`}</Typography>
              <Typography color="textSecondary">{user?.email}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab label="Profile" />
              <Tab label="Orders" />
              <Tab label="Addresses" />
            </Tabs>
            <Box sx={{ mt: 3 }}>
              {activeTab === 0 && (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        disabled={!editing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        disabled={!editing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        disabled={!editing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        {editing ? (
                          <>
                            <Button type="submit" variant="contained" color="primary">
                              Save Changes
                            </Button>
                            <Button onClick={() => setEditing(false)} color="secondary">
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => setEditing(true)}
                            startIcon={<EditIcon />}
                            variant="outlined"
                          >
                            Edit Profile
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default UserProfile;