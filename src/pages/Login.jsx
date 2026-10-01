import React from 'react';
import { MemberLogin } from './member/MemberLogin';

/**
 * Re-export the Unified Portal Login for /login Route
 */
export function Login() {
  return <MemberLogin />;
}

export default Login;
