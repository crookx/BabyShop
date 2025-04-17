import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const orderService = {
  async createOrder(orderData) {
    const response = await axios.post(`${API_URL}/orders/create`, orderData);
    return response.data;
  },

  async getOrder(orderId) {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
  },

  async processPayment(paymentMethodId, clientSecret) {
    const response = await axios.post(`${API_URL}/orders/process-payment`, {
      paymentMethodId,
      clientSecret
    });
    return response.data;
  }
};

  async getUserOrders() {


    const response = await axios.get(`${API_URL}/orders/user`);
    return response.data;
  },

  async getOrderStatus(orderId) {
    const response = await axios.get(`${API_URL}/orders/${orderId}/status`);
    return response.data;
  }
};