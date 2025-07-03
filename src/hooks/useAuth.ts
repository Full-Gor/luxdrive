import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔐 Session:', session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth event:', event, session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
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
    } finally {
      setLoading(false);
    }
  };

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