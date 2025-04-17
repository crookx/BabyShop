import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const usePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await api.getPromotions();
        setPromotions(data);
      } catch (err) {
        setError('Failed to fetch promotions');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return { promotions, loading, error };
};