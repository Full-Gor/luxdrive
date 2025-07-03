-- Script pour créer un utilisateur admin
-- ATTENTION: Exécutez ce script APRÈS avoir créé le schéma principal

-- 1. D'abord, créez manuellement l'utilisateur dans l'interface Supabase Auth
-- 2. Puis exécutez cette requête pour lui donner les droits admin

-- Remplacez 'admin@luxdrive.com' par l'email de votre choix
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@luxdrive.com';

-- Vérification que l'admin a été créé
SELECT id, email, full_name, role, created_at 
FROM profiles 
WHERE role = 'admin';

-- Si vous voulez créer plusieurs admins :
-- UPDATE profiles SET role = 'admin' WHERE email IN (
--   'admin@luxdrive.com',
--   'votre-email@example.com'
-- );