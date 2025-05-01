'use client';

import React from 'react';
import { useVerifyUser } from './useVerifyUser';
import { User } from '@/constants/type';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P & { user: User }>
) {
  return function AuthWrapper(props: P) {
    const { data: user, isLoading } = useVerifyUser();

    if (isLoading) return null;

    return <WrappedComponent {...props} user={user} />;
  };
}
