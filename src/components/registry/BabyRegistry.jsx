import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Typography, Card, CardContent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useQuery, useMutation } from 'react-query';

const BabyRegistry = () => {
  const [registryInfo, setRegistryInfo] = useState({
    babyName: '',
    dueDate: null,
    occasion: 'baby-shower',
    preferences: []
  });

  const { mutate: createRegistry } = useMutation(
    async (data) => {
      const response = await fetch('/api/registry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    }
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>Create Baby Registry</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Baby's Name (Optional)"
            value={registryInfo.babyName}
            onChange={(e) => setRegistryInfo({ ...registryInfo, babyName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="Due Date"
            value={registryInfo.dueDate}
            onChange={(date) => setRegistryInfo({ ...registryInfo, dueDate: date })}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BabyRegistry;