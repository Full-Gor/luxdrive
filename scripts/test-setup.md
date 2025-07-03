# Tests rapides LuxDrive

## 🧪 Vérifications SQL

### Vérifier les tables
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Vérifier les voitures
```sql
SELECT brand, name, category, price_per_month 
FROM cars 
ORDER BY price_per_month;
```

### Vérifier les utilisateurs
```sql
SELECT email, role, created_at 
FROM profiles 
ORDER BY created_at DESC;
```

### Créer un admin rapidement
```sql
-- Remplacez par votre email
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'VOTRE-EMAIL@gmail.com';
```

## 🚀 Tests frontend

### Démarrer l'app
```bash
npm run dev
```

### URLs à tester
- http://localhost:5173/ (Accueil)
- http://localhost:5173/register (Inscription)
- http://localhost:5173/login (Connexion)
- http://localhost:5173/cars (Catalogue)
- http://localhost:5173/admin (Dashboard admin)

## 🔧 Dépannage express

### Erreur de connexion Supabase
1. Vérifiez le fichier .env
2. Redémarrez le serveur dev
3. Vérifiez les URLs dans Supabase

### Pas d'accès admin
1. Vérifiez le rôle : `SELECT role FROM profiles WHERE email = 'votre-email';`
2. Mettez à jour : `UPDATE profiles SET role = 'admin' WHERE email = 'votre-email';`

### Email non confirmé
```sql
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email = 'votre-email@gmail.com';
```