import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../../store/slices/uiSlice';

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, type, autoHideDuration } = useSelector(
    (state) => state.ui.notification
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={type} 
        variant="filled" 
        elevation={6}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;