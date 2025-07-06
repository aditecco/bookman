import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../stores/appStore';

export const useAuth = () => {
  const { user, isAuthenticated, authLoading, setUser, setAuthLoading, signOut } = useAppStore();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setAuthLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, setAuthLoading]);

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      signOut();
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    authLoading,
    signIn,
    signUp,
    signOut: handleSignOut,
  };
}; 