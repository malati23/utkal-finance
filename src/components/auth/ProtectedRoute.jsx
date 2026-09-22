import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { isAdminAuthenticated, getAdminSession } from '../../auth/adminAuth';

/**
 * ProtectedRoute component for securing Admin Dashboard routes.
 * Ensures the user has an active authenticated session with an 'admin' role.
 * Redirects unauthenticated users or non-admin sessions to /admin-login.
 */
export function ProtectedRoute({ children }) {
  const location = useLocation();
  const authenticated = isAdminAuthenticated();
  const session = getAdminSession();
  
  // Verify both authentication status AND admin role
  const isRoleValid = !session || session.role === 'admin';

  if (!authenticated || !isRoleValid) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
