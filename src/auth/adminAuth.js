/**
 * IMPORTANT: This is frontend-only prototype authentication. For production, authenticate
 * through a backend with hashed passwords, secure sessions/JWT, role-based authorization,
 * HTTPS and server-side route protection.
 *
 * Frontend-only authentication. Production authentication must be handled by a secure backend.
 */

const ADMIN_AUTH_KEY = 'utkal_finance_admin_auth';
const LEGACY_AUTH_KEY = 'nuf_admin_auth';
const LEGACY_SESSION_KEY = 'adminSession';

/**
 * Retrieves the current admin authentication session object from localStorage.
 */
export function getAdminSession() {
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading admin auth session:', err);
  }
  return null;
}

/**
 * Verifies if an admin is currently authenticated with an "admin" role.
 * @returns {boolean}
 */
export function isAdminAuthenticated() {
  const session = getAdminSession();
  if (session && session.isAuthenticated === true && session.role === 'admin') {
    return true;
  }
  
  // Backwards compatibility check
  const legacyFlag = localStorage.getItem(LEGACY_AUTH_KEY);
  const legacySession = localStorage.getItem(LEGACY_SESSION_KEY);
  if (legacyFlag === 'true' || legacySession) {
    return true;
  }

  return false;
}

/**
 * Validates admin credentials against environment variables and creates session.
 * @param {string} email 
 * @param {string} password 
 * @returns {{ success: boolean, message?: string }}
 */
export function adminLogin(email, password) {
  if (!email || !password) {
    return { success: false, message: 'Invalid admin email or password.' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: 'Invalid admin email or password.' };
  }

  // Environment variables with fallback support
  const envEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com').trim().toLowerCase();
  const envPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'your-admin-password';

  // Support environment credentials and legacy default credentials
  const isEnvMatch = cleanEmail === envEmail && password === envPassword;
  const isLegacyMatch = cleanEmail === 'admin@newutkalfinance.com' && password === 'Admin@123';
  const isDefaultMatch = cleanEmail === 'admin@example.com' && password === 'your-admin-password';

  if (isEnvMatch || isLegacyMatch || isDefaultMatch) {
    const sessionPayload = {
      isAuthenticated: true,
      role: 'admin',
      email: cleanEmail,
      loginTime: new Date().toISOString()
    };

    try {
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionPayload));
      localStorage.setItem(LEGACY_AUTH_KEY, 'true');
      localStorage.setItem(LEGACY_SESSION_KEY, JSON.stringify({
        email: cleanEmail,
        role: 'Administrator',
        loggedInAt: sessionPayload.loginTime
      }));
    } catch (err) {
      console.error('Error saving admin session to localStorage:', err);
    }

    return { success: true };
  }

  return { success: false, message: 'Invalid admin email or password.' };
}

/**
 * Destroys the admin session from localStorage without removing application business data.
 */
export function adminLogout() {
  try {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    localStorage.removeItem(LEGACY_AUTH_KEY);
    localStorage.removeItem(LEGACY_SESSION_KEY);
  } catch (err) {
    console.error('Error clearing admin session:', err);
  }
}
