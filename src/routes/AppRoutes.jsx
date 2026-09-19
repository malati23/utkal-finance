import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Services } from '../pages/Services';
import { LoanProducts } from '../pages/LoanProducts';
import { Finance } from '../pages/Finance';
import { RealEstate } from '../pages/RealEstate';
import { Insurance } from '../pages/Insurance';
import { Contact } from '../pages/Contact';
import { Brochure } from '../pages/Brochure';
import { Gallery } from '../pages/Gallery';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

// Admin Imports
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboardLayout } from '../pages/admin/AdminDashboardLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { Applications } from '../pages/admin/Applications';
import { ApplicationDetails } from '../pages/admin/ApplicationDetails';
import { Members } from '../pages/admin/Members';
import { MemberDetails } from '../pages/admin/MemberDetails';
import { Payments } from '../pages/admin/Payments';
import { Documents } from '../pages/admin/Documents';
import { Notices } from '../pages/admin/Notices';
import { GalleryManagement } from '../pages/admin/GalleryManagement';
import { Team } from '../pages/admin/Team';
import { AdminProfile } from '../pages/admin/AdminProfile';

import { MyApplication } from '../pages/MyApplication';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Main Website Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="loans" element={<LoanProducts />} />
        <Route path="finance" element={<Finance />} />
        <Route path="real-estate" element={<RealEstate />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="my-application" element={<MyApplication />} />
      </Route>

      {/* Standalone Pages */}
      <Route path="brochure" element={<Brochure />} />

      {/* Authentication Layout */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      {/* Statutory Membership Application Portal */}
      <Route path="register" element={<Register />} />

      {/* Admin Portal Routes */}
      <Route path="admin-login" element={<AdminLogin />} />
      <Route path="admin" element={<Navigate to="/admin-dashboard" replace />} />

      <Route path="admin-dashboard" element={<AdminDashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:id" element={<ApplicationDetails />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:memberId" element={<MemberDetails />} />
        <Route path="payments" element={<Payments />} />
        <Route path="documents" element={<Documents />} />
        <Route path="notices" element={<Notices />} />
        <Route path="gallery" element={<GalleryManagement />} />
        <Route path="team" element={<Team />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

