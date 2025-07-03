# Configuration Supabase pour LuxDrive

## 🚀 Étapes de configuration

### 1. Authentification - Settings
- **Authentication** → **Settings** → **Emails**
- ❌ **Décochez "Confirm email"**
- ❌ **Décochez "Secure email change"** (optionnel)
- ✅ **Gardez "Enable sign ups"** activé

### 2. Variables d'environnement
Récupérez dans **Settings** → **API** :
```env
VITE_SUPABASE_URL=https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Création du premier admin
```sql
-- 1. Inscrivez-vous via l'interface web (/register)
-- 2. Exécutez cette requête dans SQL Editor :
UPDATE profiles SET role = 'admin' WHERE email = 'votre-email@gmail.com';
```

### 4. Vérification
```sql
-- Vérifiez que l'admin existe :
SELECT email, role FROM profiles WHERE role = 'admin';
```

## 🔐 Sécurité des mots de passe

✅ **Supabase gère automatiquement :**
- Hachage bcrypt
- Salage des mots de passe
- Validation de la force
- Protection contre les attaques

❌ **Pas besoin de :**
- Hasher manuellement
- Gérer le salage
- Configurer bcrypt

## 📱 Test de l'application

1. **Inscription** : `/register`
2. **Connexion** : `/login`
3. **Dashboard admin** : `/admin` (après promotion)
4. **Réservations** : `/cars` → Sélectionner une voiture

## 🐛 Dépannage

### Email non confirmé automatiquement
```sql
-- Forcer la confirmation pour un utilisateur :
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email = 'votre-email@gmail.com';
```

### Utilisateur bloqué
```sql
-- Débloquer un utilisateur :
UPDATE auth.users 
SET banned_until = NULL 
WHERE email = 'votre-email@gmail.com';
```

### Réinitialiser le rôle
```sql
-- Remettre en utilisateur normal :
UPDATE profiles SET role = 'user' WHERE email = 'email@example.com';
```