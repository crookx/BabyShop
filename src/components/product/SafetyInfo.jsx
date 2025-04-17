import React from 'react';
import { Box, Typography, Alert, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Warning, Info } from '@mui/icons-material';

const SafetyInfo = ({ product }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Safety Information</Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Age Recommendation: {product.ageRecommendation}
      </Alert>

      <List>
        {product.safetyFeatures?.map((feature, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText primary={feature} />
          </ListItem>
        ))}
        
        {product.warnings?.map((warning, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Warning color="warning" />
            </ListItemIcon>
            <ListItemText primary={warning} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SafetyInfo;