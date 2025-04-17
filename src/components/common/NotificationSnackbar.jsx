import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../../store/slices/uiSlice';

const NotificationSnackbar = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.ui);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={notification.show}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={notification.type || 'info'} 
        elevation={6} 
        variant="filled"
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;