import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getApplications,
  getMembers,
  getDocuments,
  updateApplicationStatus as storageUpdateApplicationStatus,
  updateMemberStatus as storageUpdateMemberStatus,
  getAdminSession,
  loginAdminSession,
  logoutAdminSession,
} from '../utils/storage';
import {
  getDeposits,
  addDeposit as storageAddDeposit,
  updateDeposit as storageUpdateDeposit,
  updateDepositStatus as storageUpdateDepositStatus,
} from '../utils/depositStorage';
import {
  getPayments,
  addPayment as storageAddPayment,
  updatePayment as storageUpdatePayment,
  verifyPayment as storageVerifyPayment,
  refundPayment as storageRefundPayment,
} from '../utils/paymentStorage';
import {
  getTransactions,
  addTransaction as storageAddTransaction,
  updateTransaction as storageUpdateTransaction,
} from '../utils/transactionStorage';
import {
  getNotices,
  addNotice as storageAddNotice,
  updateNotice as storageUpdateNotice,
  publishNotice as storagePublishNotice,
  archiveNotice as storageArchiveNotice,
  deleteNotice as storageDeleteNotice,
} from '../utils/noticeStorage';
import {
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
  const [deposits, setDeposits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [galleryItems, setGalleryItems] = useState(INITIAL_GALLERY);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);

  const refreshData = useCallback(() => {
    setApplications(getApplications());
    setMembers(getMembers());
    setPayments(getPayments());
    setDocuments(getDocuments());
    setDeposits(getDeposits());
    setTransactions(getTransactions());
    setNotices(getNotices());
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

  const createNewDeposit = (depositData) => {
    const created = storageAddDeposit(depositData);
    refreshData();
    return created;
  };

  const updateDepositRecord = (id, updatedFields) => {
    const updated = storageUpdateDeposit(id, updatedFields);
    refreshData();
    return updated;
  };

  const updateDepositStatus = (id, newStatus) => {
    storageUpdateDepositStatus(id, newStatus);
    refreshData();
  };

  const createNewPayment = (paymentData) => {
    const created = storageAddPayment(paymentData);
    refreshData();
    return created;
  };

  const updatePaymentRecord = (id, updatedFields) => {
    const updated = storageUpdatePayment(id, updatedFields);
    refreshData();
    return updated;
  };

  const verifyPaymentRecord = (id) => {
    const updated = storageVerifyPayment(id);
    refreshData();
    return updated;
  };

  const refundPaymentRecord = (id) => {
    const updated = storageRefundPayment(id);
    refreshData();
    return updated;
  };

  const createNewTransaction = (transactionData) => {
    const created = storageAddTransaction(transactionData);
    refreshData();
    return created;
  };

  const updateTransactionRecord = (id, updatedFields) => {
    const updated = storageUpdateTransaction(id, updatedFields);
    refreshData();
    return updated;
  };

  const verifyDocument = (id, newStatus) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: newStatus } : doc))
    );
  };

  // Notices CRUD
  const createNewNotice = (noticeData) => {
    const created = storageAddNotice(noticeData);
    refreshData();
    return created;
  };

  const updateNoticeRecord = (id, updatedFields) => {
    const updated = storageUpdateNotice(id, updatedFields);
    refreshData();
    return updated;
  };

  const publishNoticeRecord = (id) => {
    const updated = storagePublishNotice(id);
    refreshData();
    return updated;
  };

  const archiveNoticeRecord = (id) => {
    const updated = storageArchiveNotice(id);
    refreshData();
    return updated;
  };

  const deleteNoticeRecord = (id) => {
    const res = storageDeleteNotice(id);
    refreshData();
    return res;
  };

  const addNotice = (notice) => createNewNotice(notice);
  const updateNotice = (id, updated) => updateNoticeRecord(id, updated);
  const deleteNotice = (id) => deleteNoticeRecord(id);

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
        deposits,
        transactions,
        notices,
        galleryItems,
        teamMembers,
        updateApplicationStatus,
        updateMemberStatus,
        createNewDeposit,
        updateDepositRecord,
        updateDepositStatus,
        createNewPayment,
        updatePaymentRecord,
        verifyPaymentRecord,
        refundPaymentRecord,
        createNewTransaction,
        updateTransactionRecord,
        refreshData,
        verifyDocument,
        createNewNotice,
        updateNoticeRecord,
        publishNoticeRecord,
        archiveNoticeRecord,
        deleteNoticeRecord,
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

