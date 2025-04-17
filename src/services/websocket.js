import { io } from 'socket.io-client';
import { store } from '../store/store';
import { updateProductStock, addNotification } from '../store/slices/uiSlice';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    this.socket = io(process.env.REACT_APP_WS_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('stockUpdate', (data) => {
      store.dispatch(updateProductStock(data));
    });

    this.socket.on('orderStatus', (data) => {
      store.dispatch(addNotification({
        type: 'order',
        message: `Order #${data.orderId} status: ${data.status}`
      }));
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  emit(event, data) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    }
  }
}

export default new WebSocketService();