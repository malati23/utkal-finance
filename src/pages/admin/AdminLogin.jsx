import React from 'react';
import { MemberLogin } from '../member/MemberLogin';

/**
 * Re-export the Unified Portal Login for Admin Route
 */
export function AdminLogin() {
  return <MemberLogin />;
}

export default AdminLogin;
