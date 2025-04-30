import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const STORAGE_KEY = 'recently_viewed';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const dispatch = useDispatch();
  const recentlyViewed = useSelector(state => state.user?.recentlyViewed || []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      dispatch({ 
        type: 'user/setRecentlyViewed', 
        payload: JSON.parse(stored)
      });
    }
  }, [dispatch]);

  const addProduct = useCallback((product) => {
    if (!product) return;
    
    const updated = [
      product,
      ...recentlyViewed.filter(p => p._id !== product._id)
    ].slice(0, MAX_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    dispatch({ type: 'user/setRecentlyViewed', payload: updated });
  }, [dispatch, recentlyViewed]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'user/setRecentlyViewed', payload: [] });
  }, [dispatch]);

  return {
    products: recentlyViewed,
    addProduct,
    clearHistory
  };
};

export default useRecentlyViewed;