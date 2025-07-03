-- Configuration pour désactiver la confirmation d'email
-- Exécutez cette requête dans l'éditeur SQL de Supabase

-- Vérifier la configuration actuelle
SELECT * FROM auth.config;

-- Si vous voulez forcer la confirmation d'un utilisateur spécifique
-- UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'admin@luxdrive.com';

-- Note: La désactivation de la confirmation d'email se fait principalement 
-- via l'interface Supabase Dashboard → Authentication → Settings
-- Décochez "Enable email confirmations"