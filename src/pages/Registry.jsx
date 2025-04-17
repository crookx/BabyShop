import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Gift } from '@mui/icons-material';

const Registry = () => {
  const registryItems = [
    {
      id: 1,
      name: "Baby Crib",
      price: 299.99,
      priority: "High",
      received: 0,
      wanted: 1,
      imageUrl: "/images/products/crib.jpg"
    },
    {
      id: 2,
      name: "Diaper Set",
      price: 49.99,
      priority: "Medium",
      received: 2,
      wanted: 5,
      imageUrl: "/images/products/diapers.jpg"
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Baby Registry
        </Typography>
        
        <Grid container spacing={4}>
          {registryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Registry item card */}
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Registry;