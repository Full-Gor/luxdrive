/*
  # Schéma complet pour LuxDrive - Application de location de voitures

  1. Nouvelles Tables
    - `profiles` - Profils utilisateurs avec rôles (user/admin)
    - `cars` - Catalogue des véhicules disponibles
    - `bookings` - Réservations des clients
    - `contact_messages` - Messages de contact depuis le site

  2. Sécurité
    - Activation de RLS sur toutes les tables
    - Politiques d'accès basées sur l'authentification
    - Restrictions d'accès admin pour certaines opérations

  3. Fonctionnalités
    - Gestion des rôles utilisateurs
    - Système de réservation complet
    - Suivi des paiements Stripe
    - Messages de contact pour l'admin
*/

-- Extension pour les UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Table des voitures
CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  image_url text NOT NULL,
  pollution_quota text NOT NULL DEFAULT '0g CO₂/km',
  price_per_month integer NOT NULL,
  category text NOT NULL DEFAULT 'standard' CHECK (category IN ('standard', 'electric', 'used')),
  description text NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  car_id uuid NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  total_amount integer NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now()
);

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

-- Activation de RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Politiques pour la table profiles
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Les admins peuvent voir tous les profils"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques pour la table cars
CREATE POLICY "Tout le monde peut voir les voitures disponibles"
  ON cars
  FOR SELECT
  TO authenticated, anon
  USING (available = true);

CREATE POLICY "Les admins peuvent gérer toutes les voitures"
  ON cars
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques pour la table bookings
CREATE POLICY "Les utilisateurs peuvent voir leurs propres réservations"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent créer leurs propres réservations"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent modifier leurs propres réservations"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Les admins peuvent voir toutes les réservations"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Les admins peuvent modifier toutes les réservations"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques pour la table contact_messages
CREATE POLICY "Tout le monde peut envoyer des messages"
  ON contact_messages
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Les admins peuvent voir tous les messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Les admins peuvent modifier le statut des messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insertion des données de démonstration pour les voitures
INSERT INTO cars (name, brand, image_url, pollution_quota, price_per_month, category, description) VALUES
  (
    'Model S',
    'Tesla',
    'https://images.pexels.com/photos/12667210/pexels-photo-12667210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '0g CO₂/km',
    999,
    'electric',
    'Experience the future of driving with Tesla Model S, featuring dual motor all-wheel drive, adaptive air suspension, and up to 405 miles of range.'
  ),
  (
    'S-Class',
    'Mercedes-Benz',
    'https://images.pexels.com/photos/6894430/pexels-photo-6894430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '152g CO₂/km',
    1299,
    'standard',
    'The Mercedes-Benz S-Class stands for the fascination of the brand and defines the standards for luxury, comfort and safety.'
  ),
  (
    'Taycan',
    'Porsche',
    'https://images.pexels.com/photos/13033513/pexels-photo-13033513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '0g CO₂/km',
    1499,
    'electric',
    'The Porsche Taycan brings electrifying performance and cutting-edge technology to the Porsche lineup, setting new standards for electric vehicles.'
  ),
  (
    '7 Series',
    'BMW',
    'https://images.pexels.com/photos/6894428/pexels-photo-6894428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '172g CO₂/km',
    1199,
    'standard',
    'The BMW 7 Series delivers an unparalleled driving experience with its innovative technology, extraordinary comfort and powerful dynamics.'
  ),
  (
    'Model 3',
    'Tesla',
    'https://images.pexels.com/photos/7101579/pexels-photo-7101579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '0g CO₂/km',
    699,
    'used',
    'This pre-owned Tesla Model 3 offers incredible value with its impressive range, sleek design, and cutting-edge technology features.'
  ),
  (
    'A8',
    'Audi',
    'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '159g CO₂/km',
    1099,
    'used',
    'The Audi A8 combines elegance with advanced technology, offering a sophisticated driving experience with its powerful engine and premium interior.'
  ),
  (
    'i8',
    'BMW',
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '42g CO₂/km',
    1599,
    'electric',
    'The BMW i8 represents the future of sustainable mobility with its revolutionary plug-in hybrid technology and stunning design.'
  ),
  (
    'Continental GT',
    'Bentley',
    'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '275g CO₂/km',
    2499,
    'standard',
    'The Bentley Continental GT combines handcrafted luxury with exhilarating performance, featuring a powerful W12 engine and sumptuous interior.'
  ),
  (
    'E-Class',
    'Mercedes-Benz',
    'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '145g CO₂/km',
    899,
    'used',
    'This certified pre-owned Mercedes-Benz E-Class offers premium comfort and advanced safety features at an exceptional value.'
  );

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    'user'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un profil
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Création d'un utilisateur admin par défaut (optionnel)
-- Vous devrez changer l'email et créer ce compte via l'interface Supabase Auth
-- puis exécuter cette requête pour lui donner les droits admin :
-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@luxdrive.com';