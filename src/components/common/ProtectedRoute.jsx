import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const auth = useSelector(state => state.auth);
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('[ProtectedRoute] No token found, redirecting to auth');
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  console.log('[ProtectedRoute] Token found, rendering protected content');
  return children;
};

export default ProtectedRoute;