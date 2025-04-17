import axios from 'axios';
import { API_URL } from '../config';

class OfferManager {
  async migrateOffers(offers) {
    try {
      const response = await axios.post(`${API_URL}/offers/migrate`, offers);
      return response.data;
    } catch (error) {
      console.error('Offer migration failed:', error);
      throw error;
    }
  }

  async createOffer(offer) {
    try {
      const response = await axios.post(`${API_URL}/offers`, offer);
      return response.data;
    } catch (error) {
      console.error('Create offer failed:', error);
      throw error;
    }
  }

  async getActiveOffers() {
    try {
      const response = await axios.get(`${API_URL}/offers/active`);
      return response.data;
    } catch (error) {
      console.error('Get offers failed:', error);
      throw error;
    }
  }

  async updateOfferStatus(offerId, status) {
    try {
      const response = await axios.patch(`${API_URL}/offers/${offerId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Update offer status failed:', error);
      throw error;
    }
  }
}

export default new OfferManager();