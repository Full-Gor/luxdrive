import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      console.log('👤 Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('📊 Profile query result:', { data, error });

      if (error) {
        console.error('❌ Error fetching profile:', error);
        
        // Si le profil n'existe pas, le créer
        if (error.code === 'PGRST116') {
          console.log('🆕 Profile not found, creating...');
          await createMissingProfile(userId);
        }
      } else {
        console.log('✅ Profile found:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('💥 Error fetching profile:', error);
    }
  }, []);

  const createMissingProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        console.log('🔨 Creating profile for:', userData.user.email);
        
        const { data, error } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: userData.user.email || '',
            full_name: userData.user.user_metadata?.full_name || 'Utilisateur',
            phone: userData.user.user_metadata?.phone || '',
            role: 'user',
          })
          .select()
          .single();

        console.log('🎯 Profile creation result:', { data, error });

        if (!error) {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error('💥 Error creating profile:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Error getting session:', error);
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        console.log('🔐 Initial session:', session?.user?.email || 'No session');
        
        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchProfile(session.user.id);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('💥 Error in getInitialSession:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth event:', event, session?.user?.email || 'No user');
        
        if (!mounted) return;

        setUser(session?.user ?? null);
        
        if (session?.user && event !== 'TOKEN_REFRESHED') {
          await fetchProfile(session.user.id);
        } else if (!session?.user) {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    console.log('🚀 Attempting sign in for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    console.log('🎯 Sign in result:', { 
      success: !error, 
      user: data.user?.email,
      error: error?.message 
    });
    
    return { data, error };
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        }
      }
    });

    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
    }
    return { error };
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };
};