import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers';
import styled from '@emotion/styled';

const CalculatorCard = styled(Paper)`
  padding: 32px;
  border-radius: 20px;
  background: white;
  max-width: 600px;
  margin: 0 auto;
`;

const ResultBox = styled(Box)`
  background: linear-gradient(135deg, #FF6B9C 0%, #FF8E53 100%);
  padding: 24px;
  border-radius: 15px;
  color: white;
  text-align: center;
  margin-top: 24px;
`;

const BabyAgeCalculator = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30.44);
    const weeks = Math.floor((diffDays % 30.44) / 7);
    const days = Math.floor(diffDays % 7);

    setAge({ months, weeks, days });
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Baby Age Calculator
        </Typography>
        <Typography 
          variant="subtitle1" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Calculate your baby's exact age in months, weeks, and days
        </Typography>

        <CalculatorCard>
          <DatePicker
            label="Birth Date"
            value={birthDate}
            onChange={(newValue) => setBirthDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
            maxDate={new Date()}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={calculateAge}
            sx={{ 
              mt: 3, 
              borderRadius: '50px',
              background: 'linear-gradient(45deg, #FF6B9C 30%, #FF8E53 90%)',
            }}
          >
            Calculate Age
          </Button>

          {age && (
            <ResultBox component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typography variant="h5" gutterBottom>
                Your Baby is
              </Typography>
              <Typography variant="h4">
                {age.months} months, {age.weeks} weeks, and {age.days} days old
              </Typography>
            </ResultBox>
          )}
        </CalculatorCard>
      </motion.div>
    </Container>
  );
};

export default BabyAgeCalculator;