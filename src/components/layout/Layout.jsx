import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onMobileMenuClick={handleDrawerToggle} />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      
      <Box component="main" sx={{ 
        flexGrow: 1,
        width: '100%',
        pt: { xs: '56px', sm: '64px', md: '80px' }
      }}>
        <Outlet />
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout;