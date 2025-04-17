import React, { createContext, useContext, useState } from 'react';

// Create context with a default value
const WishlistContext = createContext({
  items: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false
});

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToWishlist = (product) => {
    setItems(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setItems(prev => prev.filter(item => item._id !== productId));
  };

  const isInWishlist = (productId) => {
    return items.some(item => item._id === productId);
  };

  const value = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};