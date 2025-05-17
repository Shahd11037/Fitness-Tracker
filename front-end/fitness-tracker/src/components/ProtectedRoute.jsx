import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

// Protected route for authenticated users only
export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    toast.error('Please log in to access this page', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Public route only for non-authenticated users (login, signup)
export const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (isAuthenticated) {
    toast.info('You are already logged in', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}; 