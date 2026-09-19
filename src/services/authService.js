import { mockDelay } from './api';

export async function loginUser(credentials) {
  await mockDelay(600);
  // Future API: const res = await api.post('/auth/login', credentials); return res.data;
  if (!credentials.email || !credentials.password) {
    throw new Error('Email/Phone and password are required');
  }

  return {
    user: {
      id: 'usr_101',
      name: credentials.email.split('@')[0] || 'Utkal User',
      email: credentials.email,
      phone: '9876543210',
      role: 'customer',
    },
    token: 'mock-jwt-token-xyz-12345',
  };
}

export async function registerUser(userData) {
  await mockDelay(800);
  // Future API: const res = await api.post('/auth/register', userData); return res.data;
  return {
    user: {
      id: `usr_${Date.now()}`,
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      role: 'customer',
    },
    token: 'mock-jwt-token-new-user-67890',
  };
}

export async function getCurrentUser() {
  await mockDelay(200);
  // Future API: const res = await api.get('/auth/me'); return res.data;
  const stored = localStorage.getItem('utkal_user');
  return stored ? JSON.parse(stored) : null;
}
