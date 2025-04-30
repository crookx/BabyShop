import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { fetchCartItems } from '../store/slices/cartSlice';
import { fetchWishlistItems } from '../store/slices/wishlistSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { count: cartCount, loading: cartLoading } = useSelector(state => state.cart);
  const { count: wishlistCount, loading: wishlistLoading } = useSelector(state => state.wishlist);

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  return (
    <nav className="navbar">
      {/* ...existing nav content... */}
      
      <div className="nav-icons">
        <Link to="/wishlist" className="nav-icon-link">
          <div className="icon-wrapper">
            <FaHeart className={wishlistLoading ? 'loading' : ''} />
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </div>
        </Link>
        
        <Link to="/cart" className="nav-icon-link">
          <div className="icon-wrapper">
            <FaShoppingCart className={cartLoading ? 'loading' : ''} />
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </div>
        </Link>
      </div>
      
      {/* ...existing nav content... */}
    </nav>
  );
};

export default Navbar;