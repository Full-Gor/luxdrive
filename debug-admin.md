# 🔧 Diagnostic et création du compte admin

## Étape 1: Vérifier si le compte existe dans Supabase

1. **Allez dans votre Dashboard Supabase**
2. **Authentication** → **Users**
3. Cherchez `admin@luxdrive.com`

### Si le compte N'EXISTE PAS :
Créez-le manuellement :

1. **Authentication** → **Users** → **Add user**
2. Email: `admin@luxdrive.com`
3. Password: `luxdrive2024!`
4. Cochez "Auto Confirm User"
5. Cliquez sur "Create user"

### Si le compte EXISTE :
Vérifiez qu'il est confirmé (colonne `email_confirmed_at` doit être remplie)

## Étape 2: Créer le profil admin

Une fois le compte créé dans Auth, exécutez cette requête dans **SQL Editor** :

```sql
-- Vérifier si le profil existe
SELECT * FROM profiles WHERE email = 'admin@luxdrive.com';

-- Si aucun résultat, créer le profil :
INSERT INTO profiles (id, email, full_name, phone, role)
SELECT 
  id, 
  email, 
  'Administrateur LuxDrive', 
  '+33123456789', 
  'admin'
FROM auth.users 
WHERE email = 'admin@luxdrive.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

## Étape 3: Vérification finale

```sql
-- Vérifier que tout est OK
SELECT 
  u.email,
  u.email_confirmed_at,
  p.full_name,
  p.role
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE u.email = 'admin@luxdrive.com';
```

## Étape 4: Test de connexion

Essayez de vous connecter avec :
- Email: `admin@luxdrive.com`
- Mot de passe: `luxdrive2024!`