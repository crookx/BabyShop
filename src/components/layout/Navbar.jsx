import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Toolbar, IconButton, Badge, Button, Container, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Menu } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import MobileDrawer from './MobileDrawer';
import SearchDrawer from '../search/SearchDrawer';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { showNotification } from '../../store/slices/uiSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchWishlist } from '../../store/slices/wishlistSlice';

const StyledAppBar = styled(AppBar)`
  background: rgba(255, 245, 247, 0.95);
  backdrop-filter: blur(10px);
   box-shadow: ${props => props.elevated ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
`;

const NavButton = styled(Button)`
  margin: 0 8px;
  position: relative;
  color: #333333 !important;
  font-weight: 600;
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 6px;
    left: 50%;
    background-color: ${props => props.theme.palette.primary.main};
    transition: all 0.3s ease;
  }
  &:hover:after {
    width: 80%;
    left: 10%;
  }
`;

const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Navbar = ({ onCartClick }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector(state => state.auth) || { isAuthenticated: false };
  const { isAuthenticated } = auth;
  const token = localStorage.getItem('token');
  
  const { items: cartItems } = useSelector(state => state.cart);
  const { items: wishlistItems } = useSelector(state => state.wishlist);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProtectedNavigation = (path, message) => {
    if (!token) {
      navigate('/auth', { 
        state: { from: path },
        replace: true 
      });
      dispatch(showNotification({
        message,
        type: 'info'
      }));
      return;
    }

    // For authenticated users, navigate directly
    if (path === '/cart') {
      onCartClick?.();
    } else {
      navigate(path, { replace: true });
    }
  };

  const handleCartClick = (e) => {
    e?.preventDefault();
    handleProtectedNavigation('/cart', 'Please login to access your cart');
  };

  const handleWishlistClick = (e) => {
    e?.preventDefault();
    if (!token) {
      navigate('/auth', { 
        state: { from: '/wishlist' },
        replace: true 
      });
      dispatch(showNotification({
        message: 'Please login to access your wishlist',
        type: 'info'
      }));
      return;
    }
    navigate('/wishlist');
  };

  const handleProfileClick = () => {
    handleProtectedNavigation('/profile', 'Please login to access your profile');
  };

  return (
    <>
      <StyledAppBar position="fixed" elevated={isScrolled}>
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            height: { xs: 56, sm: 64, md: isScrolled ? 70 : 80 },
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
                onClick={() => setMobileOpen(true)}
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
                  src="/qaran.png" 
                  alt="Qaran Baby Shop" 
                  height={isScrolled ? "80" : "100"} 
                  style={{ transition: 'height 0.3s ease' }}
                />
              </motion.div>
            </Box>

            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
              transform: isScrolled ? 'translateY(0)' : 'translateY(4px)',
              transition: 'transform 0.3s ease'
            }}>
              <NavButton component={Link} to="/" color="inherit">Home</NavButton>
              <NavButton component={Link} to="/products" color="inherit">Products</NavButton>
              <NavButton component={Link} to="/categories" color="inherit">Categories</NavButton>
              <NavButton component={Link} to="/sale" color="inherit">Sale</NavButton>
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
              <IconButton 
                color="inherit" 
                onClick={handleCartClick}
                sx={{ '&:hover': { transform: 'scale(1.1)' } }}
              >
                <Badge 
                  badgeContent={cartItems?.length || 0} 
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      animation: 'pulse 1.5s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton 
                color="inherit" 
                onClick={handleWishlistClick}
                sx={{ '&:hover': { transform: 'scale(1.1)' } }}
              >
                <Badge 
                  badgeContent={wishlistItems?.length || 0} 
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      animation: 'pulse 1.5s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    },
                  }}
                >
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
              >
                <IconButton 
                  color="inherit"
                  onClick={handleProfileClick}
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
                    src={isAuthenticated ? '/images/user-avatar.png' : undefined}
                  />
                </IconButton>
              </motion.div>
            </IconContainer>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

Navbar.propTypes = {
  onCartClick: PropTypes.func,
  onAuthClick: PropTypes.func
};

export default memo(Navbar);