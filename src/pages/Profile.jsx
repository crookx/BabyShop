import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  Tab,
  Tabs,
  TextField,
  Card,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem('token');
  
  console.log('[Profile] Component mounted, token:', !!token);
  console.log('[Profile] Current location:', location);

  useEffect(() => {
    console.log('[Profile] Component mounted/updated');
    return () => {
      console.log('[Profile] Component unmounting');
    };
  }, []);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  if (!token) {
    console.log('[Profile] No token found, redirecting to auth');
    return <Navigate to="/auth" state={{ from: '/profile' }} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={user?.avatar}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  {user?.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {user?.email}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(!editMode)}
                  sx={{ mt: 2 }}
                >
                  {editMode ? 'Cancel Edit' : 'Edit Profile'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
              <Tab label="Profile Details" />
              <Tab label="Orders" />
              <Tab label="Wishlist" />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!editMode}
                    />
                  </Grid>
                  {editMode && (
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained">
                        Save Changes
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </form>
            </motion.div>
          )}

          {/* Additional tabs content can be added here */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;