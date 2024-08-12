import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Get the user role from localStorage
  const userRole = localStorage.getItem('role');

  // Check if the role is not 'admin'
  if (userRole !== 'admin') {
    // Redirect to home or login page if the role is not 'admin'
    return <Navigate to="/" />;
  }

  // If the user is an admin, render the children components
  return children;
};

export default ProtectedRoute;
