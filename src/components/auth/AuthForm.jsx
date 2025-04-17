import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { API_BASE_URL, endpoints } from '../../config/api';

const AuthForm = ({ onAuthSuccess, mode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // Only for registration
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? endpoints.LOGIN : endpoints.REGISTER;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      onAuthSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {mode === 'register' && (
        <TextField
          margin="normal"
          required
          fullWidth
          name="name"
          label="Full Name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
        />
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email Address"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        value={formData.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default AuthForm;