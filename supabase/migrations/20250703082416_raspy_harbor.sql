-- Correction de l'image Tesla Model S avec une image Tesla spécifique
UPDATE cars 
SET image_url = 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Model S' AND brand = 'Tesla';

-- Alternative si la première ne fonctionne pas
-- UPDATE cars 
-- SET image_url = 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
-- WHERE name = 'Model S' AND brand = 'Tesla';

-- Vérification
SELECT name, brand, image_url FROM cars WHERE name = 'Model S' AND brand = 'Tesla';