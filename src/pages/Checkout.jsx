import React, { useState } from 'react';
import { Container, Stepper, Step, StepLabel } from '@mui/material';
import { motion } from 'framer-motion';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* Rest of your checkout component */}
    </Container>
  );
};

export default Checkout;