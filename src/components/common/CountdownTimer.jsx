import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const CountdownTimer = ({ endDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(timer);
        onComplete?.();
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
      {Object.keys(timeLeft).map(interval => (
        <Box
          key={interval}
          sx={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 1,
            p: 1,
            minWidth: 60,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6">
            {timeLeft[interval]}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {interval}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CountdownTimer;