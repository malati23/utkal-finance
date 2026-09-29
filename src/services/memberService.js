import { apiConfig } from './api';

/**
 * Fetch all real approved members from MongoDB
 * GET /api/members
 */
export async function getMembersApi() {
  const response = await fetch(`${apiConfig.baseURL}/members`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch members from server');
  }

  return data.members || [];
}

/**
 * Fetch single member details by memberId, applicationId, or Mongo _id
 * GET /api/members/:id
 */
export async function getMemberByIdApi(id) {
  const response = await fetch(`${apiConfig.baseURL}/members/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch member details');
  }

  return data.member || null;
}

/**
 * Update member status (Active / Inactive)
 * PATCH /api/members/:id/status
 */
export async function updateMemberStatusApi(id, status = 'Active') {
  const response = await fetch(`${apiConfig.baseURL}/members/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to update member status');
  }

  return data;
}
