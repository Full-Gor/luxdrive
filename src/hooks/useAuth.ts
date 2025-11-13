import { useState, useEffect } from 'react';

export interface LocalUser {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'user' | 'admin';
  avatar_url?: string;
}

// Initialiser le système avec un compte par défaut
const initializeDefaultUser = () => {
  const users = localStorage.getItem('luxdrive_users');
  if (!users) {
    const defaultUsers = [
      {
        id: '1',
        email: 'user@luxdrive.com',
        password: 'user123',
        full_name: 'Utilisateur',
        phone: '',
        role: 'user' as const,
      }
    ];
    localStorage.setItem('luxdrive_users', JSON.stringify(defaultUsers));
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [profile, setProfile] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Charger l'utilisateur depuis le localStorage au démarrage
  useEffect(() => {
    initializeDefaultUser();

    const currentUser = localStorage.getItem('luxdrive_current_user');
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser);
        setUser(userData);
        setProfile(userData);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
      }
    }

    setLoading(false);
    setInitialized(true);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('luxdrive_users') || '[]');
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setProfile(userWithoutPassword);
        localStorage.setItem('luxdrive_current_user', JSON.stringify(userWithoutPassword));

        return { data: { user: userWithoutPassword }, error: null };
      } else {
        return {
          data: { user: null },
          error: { message: 'Email ou mot de passe incorrect' }
        };
      }
    } catch (error) {
      return {
        data: { user: null },
        error: { message: 'Erreur lors de la connexion' }
      };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string
  ) => {
    try {
      const users = JSON.parse(localStorage.getItem('luxdrive_users') || '[]');

      // Vérifier si l'utilisateur existe déjà
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        return {
          data: { user: null },
          error: { message: 'Cet email est déjà utilisé' }
        };
      }

      // Créer le nouvel utilisateur
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        full_name: fullName,
        phone,
        role: 'user' as const,
      };

      users.push(newUser);
      localStorage.setItem('luxdrive_users', JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setProfile(userWithoutPassword);
      localStorage.setItem('luxdrive_current_user', JSON.stringify(userWithoutPassword));

      return { data: { user: userWithoutPassword }, error: null };
    } catch (error) {
      return {
        data: { user: null },
        error: { message: 'Erreur lors de l\'inscription' }
      };
    }
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('luxdrive_current_user');
    return { error: null };
  };

  return {
    user,
    profile,
    loading,
    initialized,
    signIn,
    signUp,
    signOut,
  };
};