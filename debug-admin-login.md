# 🔧 Diagnostic et correction du problème de connexion admin

## 🔍 **Étapes de diagnostic**

### 1. Vérifier si le compte admin existe dans Supabase

Allez dans votre **Dashboard Supabase** → **Authentication** → **Users** et cherchez `admin@luxdrive.com`

### 2. Si le compte N'EXISTE PAS, créez-le manuellement :

1. **Authentication** → **Users** → **Add user**
2. **Email** : `admin@luxdrive.com`
3. **Password** : `Admin123!` (nouveau mot de passe plus simple)
4. ✅ **Cochez "Auto Confirm User"**
5. Cliquez sur **"Create user"**

### 3. Si le compte EXISTE déjà, réinitialisez le mot de passe :

Dans **Authentication** → **Users** → Trouvez l'utilisateur → **Reset Password**

### 4. Créer/Vérifier le profil admin

Exécutez cette requête dans **SQL Editor** :

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

### 5. Forcer la confirmation de l'email (si nécessaire)

```sql
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email = 'admin@luxdrive.com';
```

### 6. Vérification finale

```sql
SELECT 
  u.email,
  u.email_confirmed_at,
  p.full_name,
  p.role
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE u.email = 'admin@luxdrive.com';
```

## 🔑 **Nouveaux identifiants admin**

- **Email** : `admin@luxdrive.com`
- **Mot de passe** : `Admin123!`
- **URL de connexion** : `http://localhost:5173/login`

## 🚨 **Si ça ne marche toujours pas**

### Option 1 : Créer un admin avec votre propre email

1. Inscrivez-vous normalement sur `/register` avec votre email
2. Puis exécutez :
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'VOTRE-EMAIL@example.com';
```

### Option 2 : Vérifier les logs d'erreur

Ouvrez la console du navigateur (F12) lors de la tentative de connexion pour voir les erreurs.

### Option 3 : Réinitialiser complètement

```sql
-- Supprimer l'ancien admin
DELETE FROM profiles WHERE email = 'admin@luxdrive.com';
DELETE FROM auth.users WHERE email = 'admin@luxdrive.com';
```

Puis recréez le compte depuis le début.

## ✅ **Test de connexion**

1. Allez sur `http://localhost:5173/login`
2. Email : `admin@luxdrive.com`
3. Mot de passe : `Admin123!`
4. Après connexion, allez sur `http://localhost:5173/admin`

Le problème vient souvent du fait que :
- Le compte n'est pas confirmé
- Le profil n'existe pas dans la table `profiles`
- Le rôle n'est pas défini sur 'admin'