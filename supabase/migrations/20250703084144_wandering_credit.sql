-- Correction des images des voitures avec des photos correspondant exactement aux modèles

-- Tesla Model S (berline électrique de luxe)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Model S' AND brand = 'Tesla';

-- Tesla Model 3 (berline électrique compacte)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Model 3' AND brand = 'Tesla';

-- Porsche Taycan (voiture de sport électrique)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Taycan' AND brand = 'Porsche';

-- Mercedes-Benz S-Class (berline de luxe)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'S-Class' AND brand = 'Mercedes-Benz';

-- BMW 7 Series (berline de luxe)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = '7 Series' AND brand = 'BMW';

-- Audi A8 (berline de luxe)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'A8' AND brand = 'Audi';

-- BMW i8 (voiture de sport hybride)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'i8' AND brand = 'BMW';

-- Bentley Continental GT (coupé de luxe)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Continental GT' AND brand = 'Bentley';

-- Mercedes-Benz E-Class (berline executive)
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'E-Class' AND brand = 'Mercedes-Benz';

-- Vérification des mises à jour
SELECT name, brand, image_url FROM cars ORDER BY brand, name;