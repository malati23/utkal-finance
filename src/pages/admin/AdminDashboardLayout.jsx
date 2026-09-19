import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminMobileMenu } from '../../components/admin/AdminMobileMenu';

export function AdminDashboardLayout() {
  const { isAuthenticated } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 font-sans select-none antialiased max-w-full overflow-x-hidden">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block w-64 xl:w-72 shrink-0 h-screen sticky top-0 z-40">
        <AdminSidebar />
      </div>

      {/* MOBILE DRAWER */}
      <AdminMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen max-w-full overflow-x-hidden">
        {/* TOP HEADER */}
        <AdminHeader onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
