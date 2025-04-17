import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Send } from '@mui/icons-material';
import styled from '@emotion/styled';

const NewsletterBox = styled(Box)`
  background: linear-gradient(135deg, #FFF5F7 0%, #FFE5ED 100%);
  border-radius: 40px;
  padding: 60px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <NewsletterBox>
          <Typography variant="h3" gutterBottom>
            Join Our Family
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Subscribe for exclusive offers and parenting tips
          </Typography>
          
          <Box 
            component="form" 
            sx={{ 
              display: 'flex',
              gap: 2,
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                bgcolor: 'white',
                borderRadius: '50px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px'
                }
              }}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<Send />}
                sx={{ 
                  borderRadius: '50px',
                  px: 4,
                  height: '100%'
                }}
              >
                Subscribe
              </Button>
            </motion.div>
          </Box>
        </NewsletterBox>
      </motion.div>
    </Container>
  );
};

export default NewsletterSubscribe;