-- Vérification des utilisateurs admin
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.role,
  p.created_at,
  u.email_confirmed_at,
  u.created_at as auth_created_at
FROM profiles p
JOIN auth.users u ON p.id = u.id
WHERE p.role = 'admin';

-- Si aucun admin n'existe, créez-en un :
-- 1. Inscrivez-vous via l'interface web
-- 2. Puis exécutez :
-- UPDATE profiles SET role = 'admin' WHERE email = 'VOTRE-EMAIL@example.com';