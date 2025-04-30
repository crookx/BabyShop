import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

const QuickViewModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleCartAction = async () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'cart',
          productId: product._id
        },
        replace: true
      });
      onClose();
      return;
    }
    await addToCart(product);
    onClose();
  };

  const handleWishlistAction = async () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'wishlist',
          productId: product._id
        },
        replace: true
      });
      onClose();
      return;
    }
    await addToWishlist(product);
    onClose();
  };

  return (
    <div className="quick-view-modal">
      <div className="quick-view-modal-content">
        <button onClick={onClose}>Close</button>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button onClick={handleCartAction}>Add to Cart</button>
        <button onClick={handleWishlistAction}>Add to Wishlist</button>
      </div>
    </div>
  );
};

export default QuickViewModal;