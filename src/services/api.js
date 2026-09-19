/**
 * API Client Configuration Layer
 * 
 * Future Backend Integration Note:
 * Replace mock implementations in service files with actual Axios calls using this base API instance.
 * Example:
 *   import axios from 'axios';
 *   const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
 *   export default api;
 */

const API_BASE_URL = 'http://localhost:5000/api'; // Reserved for future Node.js backend

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Mock async delay helper to simulate network latency in frontend
 */
export const mockDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));
