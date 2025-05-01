import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  ShoppingBag,
  LocalOffer,
  Category,
  Close,
  FavoriteBorder,
  PersonOutline,
  ShoppingCartOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Shop', icon: <ShoppingBag />, path: '/products' },  // Updated to match route
  { text: 'Categories', icon: <Category />, path: '/categories' },
  { text: 'Sale', icon: <LocalOffer />, path: '/sale' },
  { text: 'Wishlist', icon: <FavoriteBorder />, path: '/wishlist' },
  { text: 'Cart', icon: <ShoppingCartOutlined />, path: '/cart' },
  { text: 'Profile', icon: <PersonOutline />, path: '/profile' },
];

const MobileDrawer = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: { xs: '85%', sm: '350px' },
          maxWidth: '100%',
          boxSizing: 'border-box',
          zIndex: 1300,
          background: theme.palette.background.default,
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px'
        },
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Box component={motion.div} whileHover={{ scale: 1.05 }}>
          <img src="/Qaran.png" alt="Qaran Baby Shop" height="60" />
        </Box>
        <IconButton onClick={onClose} sx={{ 
          '&:hover': { 
            backgroundColor: alpha(theme.palette.primary.main, 0.1) 
          }
        }}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
        <AnimatePresence>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem
                component="div"
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mb: 1,
                  mx: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontWeight="500">
                      {item.text}
                    </Typography>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Typography variant="caption" color="text.secondary">
          © 2024 Qaran Baby Shop
        </Typography>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;