# Test rapide LuxDrive - 3 minutes

## ✅ Checklist de test

### 1. Configuration (30 secondes)
- [ ] Fichier .env créé avec vraies valeurs
- [ ] Confirmation email désactivée dans Supabase
- [ ] `npm run dev` lancé

### 2. Test inscription (1 minute)
- [ ] Aller sur http://localhost:5173/register
- [ ] S'inscrire avec votre vrai email
- [ ] Vérifier que ça fonctionne sans confirmation

### 3. Promotion admin (30 secondes)
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'VOTRE-EMAIL@gmail.com';
```

### 4. Test admin (1 minute)
- [ ] Se connecter sur /login
- [ ] Aller sur /admin
- [ ] Vérifier l'accès au dashboard

## 🎯 URLs importantes
- Accueil: http://localhost:5173/
- Inscription: http://localhost:5173/register
- Connexion: http://localhost:5173/login
- Voitures: http://localhost:5173/cars
- Admin: http://localhost:5173/admin

## 🔧 Si ça ne marche pas
1. Vérifiez le fichier .env
2. Redémarrez `npm run dev`
3. Vérifiez la console pour les erreurs