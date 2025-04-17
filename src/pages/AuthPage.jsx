import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Visibility, VisibilityOff, Email, Person, Lock } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { showNotification } from '../store/slices/notificationSlice';
import { setAuthData } from '../utils/auth';

const AuthPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = authMode === 'login' ? 'auth/login' : 'auth/register';
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData);
      
      if (response.data.token) {
        setAuthData(response.data);
        dispatch(login(response.data));
        dispatch(showNotification({
          message: `Successfully ${authMode === 'login' ? 'logged in' : 'registered'}!`,
          type: 'success'
        }));
        navigate(location.state?.from || '/', { replace: true });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Authentication failed';
      setError(errorMessage);
      dispatch(showNotification({
        message: errorMessage,
        type: 'error'
      }));
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const inputVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={containerVariants}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          mt: 8, 
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Paper 
            elevation={6}
            sx={{
              p: 4,
              width: '100%',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom
              sx={{ 
                background: theme.palette.primary.main,
                backgroundImage: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {authMode === 'login' ? 'Welcome Back' : 'Join Us'}
            </Typography>

            <Tabs 
              value={authMode} 
              onChange={(_, v) => setAuthMode(v)}
              centered
              sx={{ mb: 3 }}
            >
              <Tab value="login" label="Sign In" />
              <Tab value="register" label="Sign Up" />
            </Tabs>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {authMode === 'register' && (
                  <motion.div
                    key="name"
                    variants={inputVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <TextField
                      fullWidth
                      label="Full Name"
                      margin="normal"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              <motion.div variants={inputVariants}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  {loading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Sign Up')}
                </Button>
              </motion.div>
            </form>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default AuthPage;