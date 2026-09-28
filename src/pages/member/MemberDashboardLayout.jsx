import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MemberSidebar } from '../../components/member/MemberSidebar';
import { MemberHeader } from '../../components/member/MemberHeader';
import { MemberMobileMenu } from '../../components/member/MemberMobileMenu';
import { ChangePasswordModal } from '../../components/member/ChangePasswordModal';
import { MakeDepositModal } from '../../components/member/MakeDepositModal';

/**
 * MemberDashboardLayout
 * Master shell layout for all member portal authenticated routes.
 */
export function MemberDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [makeDepositOpen, setMakeDepositOpen] = useState(false);

  const mainContentRef = useRef(null);

  // Scroll to top of main container when switching subpages
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  const handleLogout = () => {
    navigate('/member-login');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 flex text-slate-900 font-sans antialiased">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 h-full bg-[#0B1528] z-20 overflow-hidden">
        <MemberSidebar
          onChangePassword={() => setChangePasswordOpen(true)}
          onLogout={handleLogout}
        />
      </aside>

      {/* MOBILE DRAWER */}
      <MemberMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onChangePassword={() => setChangePasswordOpen(true)}
        onLogout={handleLogout}
      />

      {/* MAIN CONTAINER (HEADER + SCROLLABLE RIGHT PANE) */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* TOP HEADER */}
        <MemberHeader
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          onChangePassword={() => setChangePasswordOpen(true)}
          onLogout={handleLogout}
        />

        {/* SCROLLABLE MAIN PAGE CONTENT */}
        <main
          ref={mainContentRef}
          className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto"
        >
          {/* Provide openMakeDeposit modal trigger via Outlet context */}
          <Outlet context={{ openMakeDeposit: () => setMakeDepositOpen(true) }} />
        </main>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />

      {/* MAKE DEPOSIT MODAL */}
      <MakeDepositModal
        isOpen={makeDepositOpen}
        onClose={() => setMakeDepositOpen(false)}
      />
    </div>
  );
}

export default MemberDashboardLayout;
