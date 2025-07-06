'use client';

import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Spinner from './Spinner/Spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isAuthenticated, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 