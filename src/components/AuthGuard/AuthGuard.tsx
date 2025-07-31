"use client";

import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const { isAuthenticated, authLoading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Prevent multiple redirects
    if (isRedirecting) return;

    if (!authLoading) {
      if (requireAuth && !isAuthenticated) {
        setIsRedirecting(true);
        router.push("/login");
      } else if (!requireAuth && isAuthenticated) {
        // If user is authenticated but on auth pages, redirect to bookmarks
        setIsRedirecting(true);
        router.push("/bookmarks");
      }
    }
  }, [isAuthenticated, authLoading, router, requireAuth, isRedirecting]);

  // Show loading spinner while checking authentication
  if (authLoading || isRedirecting) {
    return <Spinner />;
  }

  // Don't render anything while redirecting
  if (isRedirecting) {
    return null;
  }

  // For protected routes, don't render if not authenticated
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // For auth pages, don't render if already authenticated
  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
