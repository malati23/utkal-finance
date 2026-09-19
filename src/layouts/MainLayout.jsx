import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ApplicationModal } from '../components/ApplicationModal';

export function MainLayout() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleOpenApplyModal = (loan = null) => {
    setSelectedLoan(loan);
    setIsApplyModalOpen(true);
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
    setSelectedLoan(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onOpenApplyModal={() => handleOpenApplyModal()} />

      <main className="flex-grow">
        <Outlet context={{ openApplyModal: handleOpenApplyModal }} />
      </main>

      <Footer onOpenApplyModal={() => handleOpenApplyModal()} />

      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseApplyModal}
        selectedLoan={selectedLoan}
      />
    </div>
  );
}
