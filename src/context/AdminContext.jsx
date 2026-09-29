import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getApplications,
  getMembers,
  getDocuments,
  updateApplicationStatus as storageUpdateApplicationStatus,
  updateApplicationRecord as storageUpdateApplicationRecord,
  updateMemberStatus as storageUpdateMemberStatus,
} from '../utils/storage';
import {
  getApplicationsApi,
  getDocumentsApi,
  updateApplicationStatusApi,
  updateApplicationApi,
} from '../services/applicationService';
import {
  getMembersApi,
  updateMemberStatusApi,
} from '../services/memberService';
import {
  isAdminAuthenticated,
  adminLogin as authAdminLogin,
  adminLogout as authAdminLogout,
} from '../auth/adminAuth';
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

function normalizeApplication(app) {
  const p = app.personalDetails || {};
  const c = app.contactDetails || {};
  const a = app.addressDetails || {};
  const n = app.nomineeDetails || {};
  const m = app.membershipDetails || {};
  const doc = app.documentDetails || {};
  const w = app.witnessDetails || {};
  const d = app.declarationDetails || {};

  const nameParts = [p.title, p.firstName, p.middleName, p.lastName].filter(Boolean);
  const applicantName = nameParts.length > 0
    ? nameParts.join(' ')
    : app.applicantName || 'Applicant';

  const pay = app.paymentDetails || app.payment || {};
  const paymentReceiptUrl =
    pay.receiptUrl ||
    doc.paymentReceiptUrl ||
    app.paymentReceiptUrl ||
    (Array.isArray(doc.additionalDocuments)
      ? doc.additionalDocuments.find((d) => d.documentType === 'Payment Receipt')?.documentUrl
      : '') ||
    '';

  const paymentReceiptName =
    pay.receiptFileName ||
    (paymentReceiptUrl ? 'UPI_Payment_Receipt.png' : '');

  const paymentMethod =
    pay.method ||
    app.paymentMethod ||
    'UPI (IndusInd Bank Scan & Pay)';

  const utrNo =
    pay.utrNumber ||
    pay.utr ||
    app.utrNo ||
    'UPI_VERIFIED';

  return {
    ...app,
    _id: app._id || app.id,
    id: app.applicationId || app.id || app._id,
    applicationId: app.applicationId || app.id,
    refId: app.refId || `APP-2026-${app._id ? app._id.slice(-4) : '1001'}`,
    memberId: app.memberId || (app.status === 'approved' || app.status === 'Approved' ? `UF-2026-${app._id ? app._id.slice(-4) : '6001'}` : ''),
    empId: app.empId || `EMP-2026-${app._id ? app._id.slice(-4) : '6001'}`,
    applicantName,
    email: c.email || app.email || '',
    mobile: c.mobile || app.mobile || '',
    altMobile: app.altMobile || '9437112233',
    title: p.title || 'Mr.',
    firstName: p.firstName || '',
    middleName: p.middleName || '',
    lastName: p.lastName || '',
    relationshipPrefix: p.relationshipPrefix || 'S/o.',
    fatherLegalName: p.fatherLegalName || 'Legal Guardian',
    dob: p.dob || '1996-06-20',
    age: p.age || '30',
    gender: p.gender || 'Male',
    maritalStatus: p.maritalStatus || 'Married',
    religion: p.religion || 'Hindu',
    category: p.category || 'General',
    education: p.education || 'Graduate / P.G.',
    occupation: p.occupation || 'Business',
    address1: a.address1 || 'Plot 214, Saheed Nagar',
    villageTown: a.villageTown || 'Bhubaneswar',
    district: a.district || 'Khurda',
    state: a.state || 'Odisha',
    pincode: a.pincode || '751007',
    sameAsResidential: a.sameAsResidential !== false,
    branch: a.district ? `${a.district} Branch` : app.branch || 'Bhubaneswar HQ (Nayapalli, IRC Village)',
    introducer: app.introducer || 'Pradeep Kumar Jena',
    nomineeName: n.fullName || 'Nominee Beneficiary',
    nomineeRel: n.relationship || 'Spouse',
    nomineeDob: n.dob || '1998-04-15',
    nomineeAddr: n.address || 'Same as Applicant Address',
    numberOfShares: m.numberOfShares || 10,
    shareValue: m.shareValue || 10,
    processingFee: m.processingFee || 100,
    totalPaid: pay.amount || m.totalContribution || 200,
    idProofType: doc.idProofType || 'Aadhaar Card',
    addressProofType: doc.addressProofType || 'Aadhaar Card',
    witness1Name: w.witness1Name || 'Rajesh Kumar Swain',
    witness1Mobile: w.witness1Mobile || '9861001122',
    witness1Address: w.witness1Address || 'Bhubaneswar, Odisha',
    witness2Name: w.witness2Name || 'Manas Ranjan Rout',
    witness2Mobile: w.witness2Mobile || '9437889900',
    witness2Address: w.witness2Address || 'Cuttack, Odisha',
    sigName: d.signatureName || applicantName,
    declarationDate: d.declarationDate || new Date().toISOString().split('T')[0],
    paymentMethod,
    utrNo,
    receiptNo: app.receiptNo || 'REC-2026-1001',
    paymentReceiptUrl,
    paymentReceiptName,
    paymentDetails: {
      ...pay,
      receiptUrl: paymentReceiptUrl,
      receiptFileName: paymentReceiptName,
      method: paymentMethod,
      utrNumber: utrNo,
      amount: pay.amount || m.totalContribution || 200,
    },
    date: app.submittedAt ? new Date(app.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : app.date || 'Today',
    status: app.status || 'pending',
    createdAt: app.createdAt || new Date().toISOString(),
  };
}

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return isAdminAuthenticated();
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

  const refreshData = useCallback(async () => {
    try {
      const apiApps = await getApplicationsApi();
      if (Array.isArray(apiApps)) {
        setApplications(apiApps.map(normalizeApplication));
      } else {
        setApplications(getApplications().map(normalizeApplication));
      }
    } catch (err) {
      console.warn('API fetch failed, falling back to local storage:', err.message);
      setApplications(getApplications().map(normalizeApplication));
    }

    try {
      const apiDocs = await getDocumentsApi();
      if (Array.isArray(apiDocs)) {
        setDocuments(apiDocs);
      } else {
        setDocuments(getDocuments());
      }
    } catch (err) {
      console.warn('API documents fetch failed, falling back to local storage:', err.message);
      setDocuments(getDocuments());
    }

    try {
      const apiMembers = await getMembersApi();
      if (Array.isArray(apiMembers)) {
        setMembers(apiMembers);
      } else {
        setMembers(getMembers());
      }
    } catch (err) {
      console.warn('API members fetch failed, falling back to local storage:', err.message);
      setMembers(getMembers());
    }

    setPayments(getPayments());
    setDeposits(getDeposits());
    setTransactions(getTransactions());
    setNotices(getNotices());
  }, []);

  useEffect(() => {
    refreshData();

    const handleStorageChange = () => {
      refreshData();
      setIsAuthenticated(isAdminAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', refreshData);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', refreshData);
    };
  }, [refreshData]);

  const loginAdmin = (email, password) => {
    const res = authAdminLogin(email, password);
    if (res.success) {
      setIsAuthenticated(true);
    }
    return res;
  };

  const logoutAdmin = () => {
    authAdminLogout();
    setIsAuthenticated(false);
  };

  const updateApplicationStatus = async (idOrMongoId, newStatus) => {
    const target = applications.find(
      (a) => a._id === idOrMongoId || a.id === idOrMongoId || a.applicationId === idOrMongoId
    );

    const mongoId = target?._id || idOrMongoId;
    const targetStatus = newStatus.toLowerCase();

    // Call API: PATCH http://localhost:5000/api/applications/${mongoId}/status
    const apiResult = await updateApplicationStatusApi(mongoId, targetStatus);

    // Update local state without full page reload
    setApplications((prev) =>
      prev.map((app) => {
        if (app._id === mongoId || app.id === idOrMongoId || app.applicationId === idOrMongoId) {
          const updatedDoc = apiResult.application || {};
          return normalizeApplication({
            ...app,
            ...updatedDoc,
            status: updatedDoc.status || targetStatus,
          });
        }
        return app;
      })
    );

    storageUpdateApplicationStatus(target?.id || idOrMongoId, newStatus);
    await refreshData();
    return apiResult;
  };

  const updateApplication = async (idOrMongoId, updatedData) => {
    const target = applications.find(
      (a) => a._id === idOrMongoId || a.id === idOrMongoId || a.applicationId === idOrMongoId
    );

    const mongoId = target?._id || idOrMongoId;

    let apiResult = null;
    try {
      apiResult = await updateApplicationApi(mongoId, updatedData);
    } catch (err) {
      console.warn('API update failed, applying storage fallback:', err.message);
    }

    const updatedDoc = apiResult?.application || {};

    // Update local state without full page reload
    setApplications((prev) =>
      prev.map((app) => {
        if (app._id === mongoId || app.id === idOrMongoId || app.applicationId === idOrMongoId) {
          return normalizeApplication({
            ...app,
            ...updatedData,
            ...updatedDoc,
          });
        }
        return app;
      })
    );

    const storageResult = storageUpdateApplicationRecord(target?.id || idOrMongoId, updatedData);
    await refreshData();
    return apiResult || { success: true, application: storageResult };
  };

  const updateMemberStatus = async (id, newStatus) => {
    try {
      await updateMemberStatusApi(id, newStatus);
    } catch (err) {
      console.warn('API member status update failed:', err.message);
    }
    storageUpdateMemberStatus(id, newStatus);
    await refreshData();
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
        updateApplication,
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

