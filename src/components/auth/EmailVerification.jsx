import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Box,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus({ loading: false, error: null });
      } catch (error) {
        setStatus({ loading: false, error: error.message });
      }
    };
    verify();
  }, [token, verifyEmail]);

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Paper sx={{ p: 4, mt: 8, textAlign: 'center' }}>
          {status.loading ? (
            <CircularProgress />
          ) : status.error ? (
            <>
              <Alert severity="error" sx={{ mb: 3 }}>
                {status.error}
              </Alert>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                Email Verified Successfully!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{ mt: 2 }}
              >
                Continue to Login
              </Button>
            </>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default EmailVerification;