/**
 * Centralized Environment Configuration
 * 
 * All environment variable access is consolidated here to ensure:
 * - Single source of truth for runtime variables
 * - Type-safe fallback defaults
 * - Clean imports across components and services
 */

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Remove trailing slash if present
const cleanApiUrl = rawApiUrl.replace(/\/+$/, '');

// Derive server root base URL (without /api suffix)
const rawServerUrl = import.meta.env.VITE_SERVER_URL || cleanApiUrl.replace(/\/api$/, '');
const cleanServerUrl = rawServerUrl.replace(/\/+$/, '');

export const env = Object.freeze({
  /** Base URL for all REST API calls (e.g. 'http://localhost:5000/api') */
  API_BASE_URL: cleanApiUrl,

  /** Base root URL of backend server for static uploads/assets (e.g. 'http://localhost:5000') */
  SERVER_BASE_URL: cleanServerUrl,

  /** Default prototype Admin Email */
  ADMIN_EMAIL: (import.meta.env.VITE_ADMIN_EMAIL || 'admin@newutkalfinance.com').trim().toLowerCase(),

  /** Default prototype Admin Password */
  ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123',

  /** Environment mode */
  MODE: import.meta.env.MODE || 'development',
  IS_DEV: import.meta.env.DEV ?? true,
  IS_PROD: import.meta.env.PROD ?? false,
});

/**
 * Utility helper to convert relative asset/document paths into full backend URLs
 * @param {string} pathStr - Relative or absolute path / data URI
 * @returns {string} Fully qualified URL
 */
export function getBackendAssetUrl(pathStr) {
  if (!pathStr) return '';
  if (
    pathStr.startsWith('http://') ||
    pathStr.startsWith('https://') ||
    pathStr.startsWith('data:') ||
    pathStr.startsWith('blob:')
  ) {
    return pathStr;
  }
  const cleanPath = pathStr.startsWith('/') ? pathStr : `/${pathStr}`;
  return `${env.SERVER_BASE_URL}${cleanPath}`;
}

export const {
  API_BASE_URL,
  SERVER_BASE_URL,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  MODE,
  IS_DEV,
  IS_PROD,
} = env;

export default env;
