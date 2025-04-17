import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { api } from '../services/api';

export const useProductActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleAuthCheck = () => {
    if (!user) {
      navigate('/login', { state: { returnUrl: window.location.pathname } });
      return false;
    }
    return true;
  };

  const handleAddToCart = async (productId) => {
    if (!handleAuthCheck()) return;

    setLoading(true);
    try {
      await api.cart.add(productId);
      showNotification('Product added to cart', 'success');
      return true;
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to add to cart', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!handleAuthCheck()) return;

    setLoading(true);
    try {
      await api.cart.addToWishlist(productId);
      showNotification('Product added to wishlist', 'success');
      return true;
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to add to wishlist', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAddToCart,
    handleAddToWishlist,
    loading
  };
};