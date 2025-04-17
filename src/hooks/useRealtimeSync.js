import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebSocketService from '../services/websocket';
import { setOnlineStatus } from '../store/slices/uiSlice';

export const useRealtimeSync = () => {
  const dispatch = useDispatch();
  const isOnline = useSelector(state => state.ui.isOnline);

  useEffect(() => {
    const handleOnline = () => {
      dispatch(setOnlineStatus(true));
      WebSocketService.connect();
    };

    const handleOffline = () => {
      dispatch(setOnlineStatus(false));
      WebSocketService.disconnect();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (isOnline) {
      WebSocketService.connect();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      WebSocketService.disconnect();
    };
  }, [dispatch]);

  return isOnline;
};