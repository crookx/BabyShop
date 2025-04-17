import React from 'react';
import { Box, Card, CardContent, Typography, Button, Chip, Grid } from '@mui/material';
import { LocalOffer } from '@mui/icons-material';

const BundleDeals = ({ bundles }) => {
  return (
    <Grid container spacing={3}>
      {bundles.map((bundle) => (
        <Grid item xs={12} md={6} key={bundle.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {bundle.name}
                <Chip
                  icon={<LocalOffer />}
                  label={`Save ${bundle.savingsPercentage}%`}
                  color="primary"
                  sx={{ ml: 2 }}
                />
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {bundle.items.map((item) => (
                  <Typography key={item.id}>
                    • {item.name} (${item.price})
                  </Typography>
                ))}
              </Box>

              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Bundle Price: ${bundle.totalPrice}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => handleAddBundleToCart(bundle)}
              >
                Add Bundle to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BundleDeals;