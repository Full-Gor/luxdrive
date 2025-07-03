-- Attribution du rôle admin à l'utilisateur admin@luxdrive.com
-- Exécutez cette requête dans l'éditeur SQL de Supabase

-- 1. Vérifier si le profil existe déjà
SELECT * FROM profiles WHERE email = 'admin@luxdrive.com';

-- 2. Si le profil n'existe pas, le créer avec le rôle admin
INSERT INTO profiles (id, email, full_name, phone, role)
SELECT 
  id, 
  email, 
  'Administrateur LuxDrive', 
  '+33123456789', 
  'admin'
FROM auth.users 
WHERE email = 'admin@luxdrive.com'
ON CONFLICT (id) DO UPDATE SET 
  role = 'admin',
  full_name = 'Administrateur LuxDrive',
  phone = '+33123456789';

-- 3. Si le profil existe déjà, juste mettre à jour le rôle
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@luxdrive.com';

-- 4. Forcer la confirmation de l'email (au cas où)
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email = 'admin@luxdrive.com';

-- 5. Vérification finale
SELECT 
  u.email,
  u.email_confirmed_at,
  u.created_at as auth_created,
  p.full_name,
  p.role,
  p.created_at as profile_created
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email = 'admin@luxdrive.com';