/**
 * Utility for persisting official notice records in localStorage
 * Key: 'utkal_finance_notices'
 */

const NOTICES_KEY = 'utkal_finance_notices';

/**
 * Helper to get current timestamp string
 */
const getCurrentFormattedDate = () => {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getCurrentFormattedDateTime = () => {
  return new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Retrieve all notice records from localStorage
 * Returns [] if no records exist.
 */
export const getNotices = () => {
  try {
    const data = localStorage.getItem(NOTICES_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error reading notices from localStorage:', error);
    return [];
  }
};

/**
 * Save array of notice records to localStorage
 */
export const saveNotices = (notices) => {
  try {
    localStorage.setItem(NOTICES_KEY, JSON.stringify(notices));
  } catch (error) {
    console.error('Error saving notices to localStorage:', error);
  }
};

/**
 * Generate a unique Notice ID in the format NTC-2026-XXXX
 */
export const generateNoticeId = () => {
  const existing = getNotices();
  const year = new Date().getFullYear();
  const nextNum = existing.length + 1;
  const sequence = String(nextNum).padStart(4, '0');
  
  let candidate = `NTC-${year}-${sequence}`;
  
  // Guard against ID collision
  let counter = nextNum;
  while (existing.some(n => (n.noticeId || n.id) === candidate)) {
    counter++;
    candidate = `NTC-${year}-${String(counter).padStart(4, '0')}`;
  }
  
  return candidate;
};

/**
 * Add a new notice record
 */
export const addNotice = (noticeData) => {
  const notices = getNotices();
  const noticeId = generateNoticeId();
  const nowStr = getCurrentFormattedDate();
  const nowDateTimeStr = getCurrentFormattedDateTime();

  const isPublished = noticeData.status === 'Published';
  const isScheduled = noticeData.status === 'Scheduled';

  const newNotice = {
    id: noticeId,
    noticeId: noticeId,
    title: noticeData.title?.trim() || 'Untitled Notice',
    category: noticeData.category || 'General',
    content: noticeData.content?.trim() || '',
    audience: noticeData.audience || 'All Members',
    memberId: noticeData.memberId || '', // populated if audience === 'Specific Member'
    memberName: noticeData.memberName || '',
    status: noticeData.status || 'Draft',
    priority: noticeData.priority || 'Normal', // Normal, Important, Urgent
    createdAt: new Date().toISOString(),
    createdDate: nowStr,
    publishedAt: isPublished ? new Date().toISOString() : (isScheduled ? noticeData.publicationDate : null),
    publishedDate: isPublished ? nowStr : (noticeData.publicationDate || null),
    expiryDate: noticeData.expiryDate || null,
    createdBy: noticeData.createdBy || 'Chief Administrator',
    attachmentName: noticeData.attachmentName || '',
    attachmentUrl: noticeData.attachmentUrl || '',
    attachmentType: noticeData.attachmentType || '',
    attachmentSize: noticeData.attachmentSize || '',
    internalNotes: noticeData.internalNotes?.trim() || '',
    auditHistory: [
      {
        action: isPublished ? 'Notice Published' : 'Notice Created',
        admin: noticeData.createdBy || 'Chief Administrator',
        dateTime: nowDateTimeStr,
        details: isPublished ? 'Notice published upon creation' : 'Initial draft created',
      },
    ],
  };

  const updatedNotices = [newNotice, ...notices];
  saveNotices(updatedNotices);
  return newNotice;
};

/**
 * Update an existing notice record
 */
export const updateNotice = (id, updatedFields) => {
  const notices = getNotices();
  const nowStr = getCurrentFormattedDate();
  const nowDateTimeStr = getCurrentFormattedDateTime();

  const updatedNotices = notices.map((n) => {
    if ((n.noticeId || n.id) === id || n.id === id) {
      const wasPublished = n.status === 'Published';
      const isNowPublished = updatedFields.status === 'Published';

      let publishedAt = n.publishedAt;
      let publishedDate = n.publishedDate;

      if (!wasPublished && isNowPublished) {
        publishedAt = new Date().toISOString();
        publishedDate = nowStr;
      } else if (updatedFields.publicationDate) {
        publishedDate = updatedFields.publicationDate;
      }

      // Audit entry
      const auditHistory = Array.isArray(n.auditHistory) ? [...n.auditHistory] : [];
      auditHistory.push({
        action: 'Notice Updated',
        admin: updatedFields.updatedBy || 'Admin',
        dateTime: nowDateTimeStr,
        details: 'Notice details or status modified',
      });

      return {
        ...n,
        ...updatedFields,
        publishedAt,
        publishedDate,
        auditHistory,
        updatedAt: new Date().toISOString(),
      };
    }
    return n;
  });

  saveNotices(updatedNotices);
  return updatedNotices.find((n) => (n.noticeId || n.id) === id || n.id === id);
};

/**
 * Publish a notice
 */
export const publishNotice = (id, adminName = 'Admin') => {
  const nowStr = getCurrentFormattedDate();
  const nowDateTimeStr = getCurrentFormattedDateTime();
  const notices = getNotices();

  const updatedNotices = notices.map((n) => {
    if ((n.noticeId || n.id) === id || n.id === id) {
      const auditHistory = Array.isArray(n.auditHistory) ? [...n.auditHistory] : [];
      auditHistory.push({
        action: 'Notice Published',
        admin: adminName,
        dateTime: nowDateTimeStr,
        details: 'Status changed to Published',
      });

      return {
        ...n,
        status: 'Published',
        publishedAt: new Date().toISOString(),
        publishedDate: nowStr,
        auditHistory,
      };
    }
    return n;
  });

  saveNotices(updatedNotices);
  return updatedNotices.find((n) => (n.noticeId || n.id) === id || n.id === id);
};

/**
 * Archive a notice
 */
export const archiveNotice = (id, adminName = 'Admin') => {
  const nowDateTimeStr = getCurrentFormattedDateTime();
  const notices = getNotices();

  const updatedNotices = notices.map((n) => {
    if ((n.noticeId || n.id) === id || n.id === id) {
      const auditHistory = Array.isArray(n.auditHistory) ? [...n.auditHistory] : [];
      auditHistory.push({
        action: 'Notice Archived',
        admin: adminName,
        dateTime: nowDateTimeStr,
        details: 'Notice moved to Archive',
      });

      return {
        ...n,
        status: 'Archived',
        auditHistory,
      };
    }
    return n;
  });

  saveNotices(updatedNotices);
  return updatedNotices.find((n) => (n.noticeId || n.id) === id || n.id === id);
};

/**
 * Delete a draft notice
 */
export const deleteNotice = (id) => {
  const notices = getNotices();
  const updatedNotices = notices.filter((n) => (n.noticeId || n.id) !== id && n.id !== id);
  saveNotices(updatedNotices);
  return true;
};

/**
 * Get single notice by ID
 */
export const getNoticeById = (id) => {
  const notices = getNotices();
  return notices.find((n) => (n.noticeId || n.id) === id || n.id === id) || null;
};
