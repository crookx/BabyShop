import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();

  // For auth page, render just the content without the main layout
  if (location.pathname === '/auth') {
    return <Outlet />;
  }

  return (
    <div>
      <header>
        {/* Header content */}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default MainLayout;