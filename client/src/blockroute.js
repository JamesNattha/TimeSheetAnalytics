import React from 'react';
import { Navigate } from 'react-router';

const BlockedRoute = () => {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      Alternatively, you can redirect to a login page
      <Navigate to="register" />
    </div>
  );
};

export default BlockedRoute;
