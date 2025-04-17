import React, { useState } from 'react';
import { Paper, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    async (email) => {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return response.json();
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Subscribe to Our Newsletter
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Get exclusive offers and updates!
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </Box>

        {isSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Successfully subscribed!
          </Alert>
        )}
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Subscription failed. Please try again.
          </Alert>
        )}
      </Paper>
    </motion.div>
  );
};

export default Newsletter;