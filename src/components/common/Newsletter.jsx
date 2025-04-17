import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ show: false, type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Newsletter subscription logic
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      sx={{ textAlign: 'center', py: 8 }}
    >
      <Typography variant="h4" gutterBottom>
        Join Our Newsletter
      </Typography>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 500, mx: 'auto' }}
      >
        <TextField
          fullWidth
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          type="submit"
          size="large"
        >
          Subscribe
        </Button>
      </Box>

      <Snackbar
        open={status.show}
        autoHideDuration={6000}
        onClose={() => setStatus({ ...status, show: false })}
      >
        <Alert severity={status.type}>
          {status.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Newsletter;