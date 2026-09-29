import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MemberAuthProvider } from './context/MemberAuthContext';
import { AdminProvider } from './context/AdminContext';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MemberAuthProvider>
          <AdminProvider>
            <AppRoutes />
          </AdminProvider>
        </MemberAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
