import React, { useState, useEffect, memo } from 'react';
import { AppBar, Box, Toolbar, IconButton, Badge, Container, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Menu, Favorite } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import MobileDrawer from './MobileDrawer';
import SearchDrawer from '../search/SearchDrawer';
import CartDrawer from '../cart/CartDrawer';
import WishlistDrawer from '../wishlist/WishlistDrawer';
import { fetchCartItems } from '../../store/slices/cartSlice';
import { fetchWishlist } from '../../store/slices/wishlistSlice';

const StyledAppBar = styled(AppBar)`
  background: rgba(255, 245, 247, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.sx?.elevation === 0 ? 'none' : '0 4px 30px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
`;

const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BadgeAnimation = styled(Badge)`
  .MuiBadge-badge {
    transition: all 0.3s ease;
    transform-origin: center;
    &.new-item {
      animation: popIn 0.5s ease-out;
    }
  }

  @keyframes popIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const { user } = useSelector(state => state.auth);
  const { items: cartItems = [] } = useSelector(state => state.cart);
  const { items: wishlistItems = [] } = useSelector(state => state.wishlist);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems());
      dispatch(fetchWishlist());
    }
  }, [dispatch, user]);

  const cartItemsCount = Array.isArray(cartItems) ? cartItems.length : 0;
  const wishlistItemsCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  const handleAuthCheck = () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'auth'
        }
      });
      return true;
    }
    return false;
  };

  const handleUserClick = () => {
    if (handleAuthCheck()) return;
    // handle user menu open
  };

  const handleCartClick = () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'cart'
        }
      });
      return;
    }
    setCartOpen(true);
  };

  const handleWishlistClick = () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          action: 'wishlist'
        }
      });
      return;
    }
    setWishlistOpen(true);
  };

  const handleMobileMenuClick = () => {
    setMobileOpen(true);
  };

  return (
    <>
      <AppBar 
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            height: { xs: 56, sm: 64, md: 70 },
            px: { xs: 1, md: 2 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                color="inherit" 
                sx={{ 
                  display: { md: 'none' }, 
                  mr: 1,
                  '&:hover': { transform: 'rotate(180deg)' },
                  transition: 'transform 0.3s ease'
                }}
                onClick={handleMobileMenuClick}
              >
                <Menu />
              </IconButton>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src="/Qaran.png" 
                  alt="Qaran Baby Shop" 
                  height="80" 
                  style={{ transition: 'height 0.3s ease' }}
                />
              </motion.div>
            </Box>

            <IconContainer
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <IconButton 
                color="inherit" 
                onClick={() => setSearchOpen(true)}
                sx={{ '&:hover': { transform: 'scale(1.1)' } }}
              >
                <Search />
              </IconButton>
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton 
                  color={wishlistOpen ? 'primary' : 'default'}
                  onClick={handleWishlistClick}
                  sx={{ 
                    position: 'relative',
                    '&:hover': { color: 'primary.main' },
                    transition: 'all 0.2s'
                  }}
                >
                  <BadgeAnimation 
                    badgeContent={wishlistItemsCount}
                    color="primary"
                    max={99}
                    sx={{
                      '& .MuiBadge-badge': {
                        background: theme => theme.palette.error.main,
                        color: 'white',
                      }
                    }}
                  >
                    <Favorite />
                  </BadgeAnimation>
                </IconButton>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton 
                  color={cartOpen ? 'primary' : 'default'}
                  onClick={handleCartClick}
                  sx={{ 
                    position: 'relative',
                    '&:hover': { color: 'primary.main' },
                    transition: 'all 0.2s'
                  }}
                >
                  <BadgeAnimation 
                    badgeContent={cartItemsCount}
                    color="primary"
                    max={99}
                    sx={{
                      '& .MuiBadge-badge': {
                        background: theme => theme.palette.primary.main,
                        color: 'white',
                      }
                    }}
                  >
                    <ShoppingCart />
                  </BadgeAnimation>
                </IconButton>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
              >
                <IconButton 
                  color="inherit"
                  onClick={handleUserClick}
                  sx={{ 
                    ml: 1,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      transform: 'rotate(360deg)',
                      transition: 'transform 0.5s ease'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
              </motion.div>
            </IconContainer>
          </Toolbar>
        </Container>
      </AppBar>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
};

export default memo(Navbar);