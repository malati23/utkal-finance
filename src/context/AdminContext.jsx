import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getApplications,
  getMembers,
  getPayments,
  getDocuments,
  updateApplicationStatus as storageUpdateApplicationStatus,
  updateMemberStatus as storageUpdateMemberStatus,
  getAdminSession,
  loginAdminSession,
  logoutAdminSession,
} from '../utils/storage';
import {
  INITIAL_NOTICES,
  INITIAL_GALLERY,
  INITIAL_TEAM,
} from '../data/adminMockData';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getAdminSession() || localStorage.getItem('nuf_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState({
    name: 'Administrator',
    email: 'admin@newutkalfinance.com',
    phone: '+91 98610 00000',
    role: 'Chief Administrator',
    branch: 'Bhubaneswar HQ (Nayapalli, IRC Village)',
    lastLogin: 'Today at 10:45 AM',
  });

  const [applications, setApplications] = useState([]);
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [galleryItems, setGalleryItems] = useState(INITIAL_GALLERY);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);

  const refreshData = useCallback(() => {
    setApplications(getApplications());
    setMembers(getMembers());
    setPayments(getPayments());
    setDocuments(getDocuments());
  }, []);

  useEffect(() => {
    refreshData();

    const handleStorageChange = () => {
      refreshData();
      setIsAuthenticated(!!getAdminSession() || localStorage.getItem('nuf_admin_auth') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', refreshData);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', refreshData);
    };
  }, [refreshData]);

  const loginAdmin = (email, password) => {
    if (email === 'admin@newutkalfinance.com' && password === 'Admin@123') {
      loginAdminSession();
      localStorage.setItem('nuf_admin_auth', 'true');
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Credentials' };
  };

  const logoutAdmin = () => {
    logoutAdminSession();
    localStorage.removeItem('nuf_admin_auth');
    setIsAuthenticated(false);
  };

  const updateApplicationStatus = (id, newStatus) => {
    storageUpdateApplicationStatus(id, newStatus);
    refreshData();
  };

  const updateMemberStatus = (id, newStatus) => {
    storageUpdateMemberStatus(id, newStatus);
    refreshData();
  };

  const verifyDocument = (id, newStatus) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: newStatus } : doc))
    );
  };

  // Notices CRUD
  const addNotice = (notice) => {
    const newNotice = {
      ...notice,
      id: `NOT-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setNotices((prev) => [newNotice, ...prev]);
  };

  const updateNotice = (id, updated) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)));
  };

  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (item) => {
    const newItem = {
      ...item,
      id: `GAL-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id, updated) => {
    setGalleryItems((prev) => prev.map((g) => (g.id === id ? { ...g, ...updated } : g)));
  };

  const deleteGalleryItem = (id) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
  };

  // Team CRUD
  const addTeamMember = (member) => {
    const newMember = {
      ...member,
      id: `TM-${Date.now()}`,
    };
    setTeamMembers((prev) => [newMember, ...prev]);
  };

  const updateTeamMember = (id, updated) => {
    setTeamMembers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTeamMember = (id) => {
    setTeamMembers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        setAdminUser,
        loginAdmin,
        logoutAdmin,
        applications,
        members,
        payments,
        documents,
        notices,
        galleryItems,
        teamMembers,
        updateApplicationStatus,
        updateMemberStatus,
        verifyDocument,
        addNotice,
        updateNotice,
        deleteNotice,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

